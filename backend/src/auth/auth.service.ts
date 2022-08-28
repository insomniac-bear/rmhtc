import {
  Injectable,
  Inject,
  HttpException,
  ForbiddenException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/core/mail/mail.service';
import { CompanyService } from 'src/company/company.service';
import { EmailToken } from './entity/email-token.entity';
import { RefreshToken } from './entity/refresh-token.entity';
import { User } from 'src/users/entity/user.entity';
import { Tokens, JwtPayload } from './types';
import {
  EMAIL_TOKEN_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { FinishRegistrationDto, LoginDto } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMAIL_TOKEN_REPOSITORY)
    private readonly emailTokenEntity: typeof EmailToken,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenEntity: typeof RefreshToken,
    @Inject(USER_REPOSITORY) private readonly userEntity: typeof User,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async registration(data: { email: string }) {
    const candidate = await this.usersService.getUserByParam(
      'email',
      data.email
    );

    if (!!candidate.uuid) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser({
      ...data,
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

  async confirmEmail(query: ConfirmEmailDto) {
    const { sub: userUuid } = await this.jwtService.verify<{ sub: string }>(
      query.emailToken,
      { secret: process.env.JWT_MAIL_SECRET }
    );
    if (!userUuid) throw new ForbiddenException('Access denied');

    const existUser = this.usersService.getUserByParam('uuid', userUuid);
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const savedToken = this.emailTokenEntity.findOne({ where: { userUuid } });
    if (!savedToken) throw new ForbiddenException('Access denied');

    await this.userEntity.update(
      { emailVerified: true },
      { where: { uuid: userUuid } }
    );
    const user = await this.usersService.getUserByParam('uuid', userUuid);

    return {
      status: 'success',
      data: user,
    };
  }

  async finishRegistration(updatedData: FinishRegistrationDto, res: Response) {
    const { uuid, password, businessRole } = updatedData.userData;
    const { name } = updatedData.companyData;

    const existUser = this.usersService.getUserByParam('uuid', uuid);
    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.companyService.createCompany(name, uuid);
    const hashedPassword: string = await bcrypt.hash(password, 7);
    const user = await this.usersService.update(uuid, {
      password: hashedPassword,
      businessRole,
    });

    await this.emailTokenEntity.destroy({ where: { userUuid: uuid } });

    const { accessToken, refreshToken } = await this.getTokens(
      user.uuid,
      user.email,
      user.role
    );
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
    };
  }

  async login(data: LoginDto, res: Response) {
    const user = await this.usersService.getUserByParam('email', data.email);
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await this.usersService.compareUserPassword(
      user.uuid,
      data.password
    );
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const { accessToken, refreshToken } = await this.getTokens(
      user.uuid,
      user.email,
      user.role
    );

    await this.saveRefreshToken(user.uuid, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      accessToken,
      userData: user,
    };
  }

  async logout(userUuid: string, res: Response) {
    await this.dropRefreshToken(userUuid);

    res.clearCookie('refreshToken');
    return {
      status: 'success',
    };
  }

  async checkAuth(at: string, rt: string, res: Response) {
    try {
      if (!at) {
        console.log(at);
        throw new HttpException('jwt expired', HttpStatus.FORBIDDEN);
      }

      const accessPayload: JwtPayload = this.jwtService.verify(at, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      if (accessPayload.sub) {
        const user = await this.usersService.getUserByParam(
          'uuid',
          accessPayload.sub
        );

        const { accessToken, refreshToken } = await this.getTokens(
          user.uuid,
          user.email,
          user.role
        );

        await this.saveRefreshToken(user.uuid, refreshToken);

        res.cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: 'lax',
        });

        return {
          accessToken,
          userData: user,
        };
      }
    } catch (err) {
      const refreshPayload: JwtPayload = this.jwtService.verify(rt, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      if (!refreshPayload.sub) throw new ForbiddenException('Expired');

      const user = await this.usersService.getUserByParam(
        'uuid',
        refreshPayload.sub
      );

      if (!user.uuid) {
        throw new HttpException('jwt expired', HttpStatus.FORBIDDEN);
      }

      const { accessToken, refreshToken } = await this.getTokens(
        user.uuid,
        user.email,
        user.role
      );

      await this.saveRefreshToken(user.uuid, refreshToken);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
      });

      return {
        accessToken,
        userData: user,
      };
    }
  }

  /**
   * Функция для генерирования Access и Refresh токенов
   */
  async getTokens(
    userUuid: string,
    email: string,
    role: string
  ): Promise<Tokens> {
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
      },
    });
    if (!!oldToken) {
      await oldToken.update({ refreshToken });
    } else {
      await this.refreshTokenEntity.create({
        refreshToken,
        userUuid,
      });
    }
  }

  /**
   * Функция удаления Refresh Token из БД
   */
  async dropRefreshToken(userUuid: string) {
    const candidateForDrop = await this.refreshTokenEntity.findOne({
      where: { userUuid },
    });
    if (!candidateForDrop) throw new ForbiddenException('Forbidden');

    await this.refreshTokenEntity.destroy({ where: { userUuid } });
  }

  /**
   * Функция поиска Refresh Token в БД
   */
  async getRefreshToken(userUuid: string) {
    const token = await this.refreshTokenEntity.findOne({
      where: {
        userUuid,
      },
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
