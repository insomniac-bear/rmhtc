import { forwardRef, Injectable, Inject, HttpException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/core/mail/mail.service';
import { CompanyService } from 'src/company/company.service';
import { EmailToken } from './entity/email-token.entity';
import { RefreshToken } from './entity/refresh-token.entity';
import { User } from 'src/users/entity/user.entity';
import { Tokens } from './types';
import { UserDataDto } from 'src/users/dto';
import { EMAIL_TOKEN_REPOSITORY, REFRESH_TOKEN_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMAIL_TOKEN_REPOSITORY) private readonly emailTokenEntity: typeof EmailToken,
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokenEntity: typeof RefreshToken,
    @Inject(USER_REPOSITORY) private readonly userEntity: typeof User,
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async registration(email) {
    const candidate = await this.usersService.getUserByParam('email', email.email);

    if (!!candidate.uuid) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser({
      ...email,
    });

    const emailToken = await this.getMailToken(user.uuid, user.email);
    const savedToken = await this.emailTokenEntity.create({
      emailToken,
      userUuid: user.uuid,
    });
    await this.mailService.sendUserConfirmation(user, savedToken.emailToken);

    return {
      status: 'success',
      data: true,
    };
  }

  async confirmEmail(query: Tokens) {
    const {
      sub: userUuid,
    } = await this.jwtService.verify(query.emailToken, { secret: process.env.JWT_MAIL_SECRET, });
    if (!userUuid) throw new ForbiddenException('Access denied');

    const savedToken = this.emailTokenEntity.findOne({ where: { userUuid } });
    if (!savedToken) throw new ForbiddenException('Access denied');

    await this.userEntity.update({ emailVerified: true }, { where: { uuid: userUuid } });
    const user = await this.usersService.getUserByParam('uuid', userUuid);

    return {
      status: 'success',
      data: user,
    }
  }

  async finishRegistration(updatedData, res) {
    const { uuid, password, businessRole } = updatedData.userData;
    const { name } = updatedData.companyData;

    await this.companyService.createCompany(name, uuid);
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.usersService.update(uuid, { password: hashedPassword, businessRole });

    await this.emailTokenEntity.destroy({ where: { userUuid: uuid } });

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email, user.role);
    await this.saveRefreshToken(user.uuid, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      userData: user,
    }
  }

  async login(userDto: UserDataDto, res) {
    const user = await this.usersService.getUserByParam('email', userDto.email);
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await this.usersService.compareUserPassword(user.uuid, userDto.password);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email, user.role);

    await this.saveRefreshToken(user.uuid, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      accessToken,
      userData: user,
    }
  }

  async logout(userUuid, res) {
    await this.dropRefreshToken(userUuid);

    res.clearCookie('refreshToken');
    return {
      status: 'success',
    };
  }

  async refresh(user, rt: string, res) {
    const savedToken = await this.getRefreshToken(user.sub);
    if (!savedToken) throw new ForbiddenException('Access denied');

    if (rt !== savedToken.refreshToken) throw new ForbiddenException('Access denied');

    const { accessToken, refreshToken } = await this.getTokens(user.sub, user.email, user.role);
    await this.saveRefreshToken(user.sub, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken
    };
  }

  /**
   * Функция для генерирования Access и Refresh токенов
  */
  async getTokens(userUuid: string, email: string, role: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userUuid,
          email,
          role,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userUuid,
          email,
          role,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  /**
   * Функция сохранения Refresh Token в БД
  */
  async saveRefreshToken(userUuid: string, refreshToken: string) {
    const oldToken = await this.refreshTokenEntity.findOne({
      where: {
        userUuid,
      }
    });
    if (!!oldToken) {
      await oldToken.update({ refreshToken });
    } else {
      await this.refreshTokenEntity.create({
        refreshToken,
        userUuid,
      })
    }
  }

  /**
   * Функция удаления Refresh Token из БД
  */
  async dropRefreshToken(userUuid) {
    const candidateForDrop = await this.refreshTokenEntity.findOne({ where: { userUuid } });
    if (!candidateForDrop) throw new ForbiddenException('Forbidden');

    await this.refreshTokenEntity.destroy({ where: { userUuid } });
  }

  /**
   * Функция поиска Refresh Token в БД
  */
  async getRefreshToken(userUuid) {
    const token = await this.refreshTokenEntity.findOne({
      where: {
        userUuid,
      }
    });

    if (!token) {
      return undefined;
    }

    return token;
  }

  /**
   * Функция для генерирования Email Token
  */
  async getMailToken(userUuid: string, email: string): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userUuid,
        email,
      },
      {
        secret: process.env.JWT_MAIL_SECRET,
      }
    );
  }
}
