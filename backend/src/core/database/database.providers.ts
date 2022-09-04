import { Sequelize } from 'sequelize-typescript';
import { AddressType } from 'src/address/entity/address-type.entity';
import { Address } from 'src/address/entity/address.entity';
import { City } from 'src/address/entity/city.entity';
import { Country } from 'src/address/entity/country.entity';
import { EmailToken } from 'src/auth/entity/email-token.entity';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Category } from 'src/category/entity/category.entity';
import { OfferCategory } from 'src/category/entity/offer-category.entity';
import { BusinessType } from 'src/company/entity/business-type.entity';
import { Company } from 'src/company/entity/company.entity';
import { LegalForm } from 'src/company/entity/legal-form.entity';
import { ContactType } from 'src/contacts/entity/contact-type.entity';
import { Contact } from 'src/contacts/entity/contact.entity';
import { Currency } from 'src/currency/entity/currency.entity';
import { MessengerType } from 'src/messengers/entity/messenger-type.entity';
import { Messenger } from 'src/messengers/entity/messenger.entity';
import { Moderation } from 'src/moderation/entity/moderation.entity';
import { Characteristic } from 'src/offer/entity/characteristic.entity';
import { OfferPhoto } from 'src/offer/entity/offer-photo.entity';
import { OfferType } from 'src/offer/entity/offer-type.entity';
import { Offer } from 'src/offer/entity/offer.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { User } from 'src/users/entity/user.entity';
import { SEQUELIZE, DEVELOPMENT, LOCAL, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case LOCAL:
          config = databaseConfig.local;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Role,
        EmailToken,
        RefreshToken,
        Company,
        Address,
        AddressType,
        Country,
        City,
        BusinessType,
        LegalForm,
        MessengerType,
        Messenger,
        Contact,
        ContactType,
        Moderation,
        Offer,
        OfferType,
        OfferPhoto,
        Characteristic,
        Currency,
        Category,
        OfferCategory,
      ]);
      return sequelize;
    },
  },
];
