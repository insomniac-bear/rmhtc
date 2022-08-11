import { raw } from 'express';
import { MessengerType } from '../entity/messenger-type.entity';

export class MessengerTypeDto {
  readonly uuid: string;
  readonly value: string;
}

export const createMessengerTypeDto = (
  rawData: MessengerType
): MessengerTypeDto => {
  return {
    uuid: rawData.uuid,
    value: rawData.value,
  };
};
