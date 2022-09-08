import { TModerated } from 'src/company/types';

export class ResponseUserOffer {
  uuid?: string;
  name?: string;
  price?: {
    value?: string;
    currency?: string;
    unit?: string;
    amount?: string;
  };
  priceComment?: string;
  description?: string;
  moderated?: TModerated;
  moderatedReason: string;
  moderatedAuthorUuid: string;
  currency?: string;
  offerType?: string;
  company?: {
    uuid?: string;
    name?: string;
  };
  offerPhotos?: {
    url?: string;
    description?: string;
  }[];
  characteristics?: {
    name?: string;
    value?: string;
  }[];
  categories?: string[];
}

export const createUserOfferResponse = (data): ResponseUserOffer => ({
  uuid: data?.uuid,
  name: data?.name,
  price: {
    value: data?.price,
    currency: data?.currencies?.value,
    unit: data?.unit,
    amount: data?.amount,
  },
  description: data?.description,
  moderated: data?.moderated,
  moderatedReason: data?.moderation?.reason,
  moderatedAuthorUuid: data.moderation?.authorUuid,
  currency: data?.currencies?.value,
  offerType: data?.offerType?.value,
  company: {
    uuid: data?.companies?.uuid,
    name: data?.companies?.name,
  },
  characteristics: data?.characteristic?.map((it) => ({
    name: it.name,
    value: it.value,
  })),
  categories: data?.categories?.map((it) => it.value),
});
