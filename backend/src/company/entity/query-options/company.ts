import { AddressType } from 'src/address/entity/address-type.entity';
import { Address } from 'src/address/entity/address.entity';
import { ContactType } from 'src/contacts/entity/contact-type.entity';
import { Contact } from 'src/contacts/entity/contact.entity';
import { MessengerType } from 'src/messengers/entity/messenger-type.entity';
import { Messenger } from 'src/messengers/entity/messenger.entity';
import { Moderation } from 'src/moderation/entity/moderation.entity';
import { BusinessType } from '../business-type.entity';
import { LegalForm } from '../legal-form.entity';

export const allFields = [
  {
    model: Address,
    include: [
      {
        model: AddressType,
      },
    ],
  },
  {
    model: Contact,
    include: [
      {
        model: ContactType,
      },
    ],
  },
  {
    model: Messenger,
    include: [
      {
        model: MessengerType,
      },
    ],
  },
  {
    model: BusinessType,
  },
  {
    model: LegalForm,
  },
  {
    model: Moderation,
  },
];
