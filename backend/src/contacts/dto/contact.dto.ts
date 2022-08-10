import { Contact } from '../entity/contact.entity';

export const createContactDto = (contactsRawData: Contact) => ({
  uuid: contactsRawData?.uuid,
  value: contactsRawData?.value,
});
