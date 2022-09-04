import {
  CHARACTERISTIC_REPOSITORY,
  OFFER_PHOTO_REPOSITORY,
  OFFER_REPOSITORY,
  OFFER_TYPE_REPOSITORY,
} from 'src/core/constants';
import { Characteristic } from './entity/characteristic.entity';
import { OfferPhoto } from './entity/offer-photo.entity';
import { OfferType } from './entity/offer-type.entity';
import { Offer } from './entity/offer.entity';

export const offerProviders = [
  {
    provide: OFFER_REPOSITORY,
    useValue: Offer,
  },
  {
    provide: OFFER_TYPE_REPOSITORY,
    useValue: OfferType,
  },
  {
    provide: OFFER_PHOTO_REPOSITORY,
    useValue: OfferPhoto,
  },
  {
    provide: CHARACTERISTIC_REPOSITORY,
    useValue: Characteristic,
  },
];
