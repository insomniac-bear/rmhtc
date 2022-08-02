import { MESSENGER_REPOSITORY, MESSENGER_TYPE_REPOSITORY } from "src/core/constants";
import { MessengerType } from "./entity/messenger-type.entity";
import { Messenger } from "./entity/messenger.entity";

export const messengersProvider = [
  {
    provide: MESSENGER_REPOSITORY,
    useValue: Messenger,
  },
  {
    provide: MESSENGER_TYPE_REPOSITORY,
    useValue: MessengerType,
  }
];
