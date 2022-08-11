import { Messenger } from '../entity/messenger.entity';
import { IMessenger } from '../types';

export const createMessengerDto = (messenger: Messenger): IMessenger => {
  return {
    value: messenger?.value,
    type: messenger?.messengerType?.value,
  };
};
