import { Injectable, Inject } from '@nestjs/common';
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

  async saveMessenger(messengerTypeUuid, value, companyUuid) {
    return await this.messengerEntity.create({
      value,
      messengerTypeUuid,
      companyUuid,
    });
  }
}
