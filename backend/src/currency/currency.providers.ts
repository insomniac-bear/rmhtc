import { CURRENCY_REPOSITORY } from 'src/core/constants';
import { Currency } from './entity/currency.entity';

export const currencyProviders = [
  {
    provide: CURRENCY_REPOSITORY,
    useValue: Currency,
  },
];
