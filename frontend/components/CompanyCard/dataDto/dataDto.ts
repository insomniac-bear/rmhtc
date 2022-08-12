import { findGeo } from './utils';
import { ICompanyAddress, ICompanyData } from '../types';

export const addressDataDto = (data: ICompanyAddress) => ({
  type: data?.addressType,
  address: {
    postCode: data?.postCode,
    country: data?.country,
    city: data?.city,
    street: data?.street,
    buildNum: data?.buildNum,
    roomNum: data?.roomNum,
  },
  value: Object.values(data).join(', ').replace(`, ${data?.addressType}`, ''),
  uuid: data?.uuid,
});

export const headerDataDto = (data: ICompanyData) => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  geo: findGeo(data?.addresses?.map((el) => addressDataDto(el))),
});

export const basicInfoDataDto = (data: ICompanyData) => ({
  website: data?.website,
  ceo: data?.ceo,
  businessType: data?.businessType?.value,
  ceoDocUrl: data?.ceoDocUrl,
});

export const legalInfoDataDto = (data: ICompanyData) => ({
  legalForm: data?.legalForm?.shortValue,
  qcEmployees: data?.qcEmployees,
  budgetOfYear: data?.budgetOfYear,
  yearOfFoundation: data?.yearOfFoundation,
  regDocUrl: data?.regDocUrl,
  issuingAuthority: data?.issuingAuthority,
  [data?.regNumName || 0]: data?.regNumber,
});

export const contactsIfoDataDto = (data: ICompanyData) => ({
  addresses: data?.addresses?.map((el) => addressDataDto(el)),
  contacts: data?.contacts,
  messengers: data?.messengers,
});
