import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
    private readonly messengerTypeEntity: typeof MessengerType
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

  async createMessengerType(value: string): Promise<MessengerType[]> {
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
    return types;
  }

  async updateMessengerType(
    uuid: string,
    value: string
  ): Promise<MessengerType[]> {
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

    return await this.messengerTypeEntity.findAll();
  }
}
