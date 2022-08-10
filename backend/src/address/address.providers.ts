import {
  ADDRESS_REPOSITORY,
  ADDRESS_TYPE_REPOSITORY,
  CITY_REPOSITORY,
  COUNTRY_REPOSITORY,
} from 'src/core/constants';
import { AddressType } from './entity/address-type.entity';
import { Address } from './entity/address.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';

export const addressProviders = [
  {
    provide: ADDRESS_REPOSITORY,
    useValue: Address,
  },
  {
    provide: ADDRESS_TYPE_REPOSITORY,
    useValue: AddressType,
  },
  {
    provide: CITY_REPOSITORY,
    useValue: City,
  },
  {
    provide: COUNTRY_REPOSITORY,
    useValue: Country,
  },
];
