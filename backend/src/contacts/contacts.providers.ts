import {
  CONTACT_REPOSITORY,
  CONTACT_TYPE_REPOSITORY,
} from 'src/core/constants';
import { ContactType } from './entity/contact-type.entity';
import { Contact } from './entity/contact.entity';

export const contactsProvider = [
  {
    provide: CONTACT_REPOSITORY,
    useValue: Contact,
  },
  {
    provide: CONTACT_TYPE_REPOSITORY,
    useValue: ContactType,
  },
];
