import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import {
  MESSENGER_REPOSITORY,
  MESSENGER_TYPE_REPOSITORY,
} from 'src/core/constants';
import {
  createMessengerTypeDto,
  MessengerTypeDto,
} from './dto/messenger-type.dto';
import { MessengerType } from './entity/messenger-type.entity';
import { Messenger } from './entity/messenger.entity';

@Injectable()
export class MessengersService {
  constructor(
    @Inject(MESSENGER_REPOSITORY)
    private readonly messengerEntity: typeof Messenger,
    @Inject(MESSENGER_TYPE_REPOSITORY)
    private readonly messengerTypeEntity: typeof MessengerType,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async getAllTypesOfMessenger(): Promise<MessengerTypeDto[]> {
    const rawTypesData = await this.messengerTypeEntity.findAll();
    return rawTypesData.map((messengerType) =>
      createMessengerTypeDto(messengerType)
    );
  }

  async createMessenger(
    messengerTypeUuid: string,
    value: string,
    companyUuid: string
  ): Promise<Messenger> {
    const typeOfMessenger = await this.messengerTypeEntity.findByPk(
      messengerTypeUuid
    );

    if (!typeOfMessenger) {
      throw new HttpException(
        'Not found type of messenger',
        HttpStatus.NOT_FOUND
      );
    }

    const existMessenger = await this.messengerEntity.findOne({
      where: {
        value,
      },
    });

    existMessenger
      ? await existMessenger.update({
          messengerTypeUuid,
          value,
          companyUuid,
        })
      : await this.messengerEntity.create({
          messengerTypeUuid,
          value,
          companyUuid,
        });
    return this.messengerEntity.findOne({
      where: {
        messengerTypeUuid,
        companyUuid,
      },
    });
  }

  async createMessengerType(
    accessTokenPayload: JwtPayload,
    res,
    value: string
  ): Promise<{ status: string; accessToken: string; types: MessengerType[] }> {
    const { sub, role, email } = accessTokenPayload;
    const candidate = await this.messengerTypeEntity.findOne({
      where: {
        value,
      },
    });

    if (candidate) {
      throw new HttpException(
        `${value} type already exist`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.messengerTypeEntity.create({ value });
    const types = await this.messengerTypeEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }

  async updateMessengerType(
    accessTokenPayload: JwtPayload,
    res,
    uuid: string,
    value: string
  ): Promise<{ status: string; accessToken: string; types: MessengerType[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.messengerTypeEntity.findByPk(uuid);

    if (!candidate) {
      throw new HttpException('Messenger type not found', HttpStatus.NOT_FOUND);
    }

    const candidateType = await this.messengerTypeEntity.findOne({
      where: {
        value,
      },
    });

    if (candidateType) {
      throw new HttpException(
        `${value} type already exist`,
        HttpStatus.BAD_REQUEST
      );
    }
    await candidate.update({ value });

    const types = await this.messengerTypeEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }
}
