import { Category } from 'src/category/entity/category.entity';
import { Company } from 'src/company/entity/company.entity';
import { Currency } from 'src/currency/entity/currency.entity';
import { Moderation } from 'src/moderation/entity/moderation.entity';
import { Characteristic } from '../characteristic.entity';
import { OfferPhoto } from '../offer-photo.entity';
import { OfferType } from '../offer-type.entity';

export const fieldsForUserResponse = [
  {
    model: Currency,
    attributes: ['value'],
  },
  {
    model: OfferType,
    attributes: ['value'],
  },
  {
    model: Company,
    attributes: ['uuid', 'name'],
  },
  {
    model: OfferPhoto,
  },
  {
    model: Characteristic,
    attributes: ['name', 'value'],
  },
  {
    model: Category,
    attributes: ['value'],
  },
  {
    model: Moderation,
  },
];
