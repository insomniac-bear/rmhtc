import { ContactType } from '../entity/contact-type.entity';

export const createContactTypeDto = (rawData: ContactType) => ({
  uuid: rawData?.uuid,
  value: rawData?.value,
});
