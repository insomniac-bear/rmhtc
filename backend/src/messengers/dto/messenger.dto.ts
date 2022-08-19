import { Messenger } from '../entity/messenger.entity';
import { IMessenger } from '../types';

export const createMessengerDto = (messenger: Messenger): IMessenger => {
  return {
    uuid: messenger?.uuid,
    value: messenger?.value,
    type: messenger?.messengerType?.value,
  };
};
