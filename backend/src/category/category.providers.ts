import {
  CATEGORY_REPOSITORY,
  OFFER_CATEGORY_REPOSITORY,
} from 'src/core/constants';
import { Category } from './entity/category.entity';
import { OfferCategory } from './entity/offer-category.entity';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
  {
    provide: OFFER_CATEGORY_REPOSITORY,
    useValue: OfferCategory,
  },
];
