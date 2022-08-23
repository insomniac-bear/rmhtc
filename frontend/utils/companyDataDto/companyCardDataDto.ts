import { findGeo } from '../utils';
import { ICompanyData } from '../../types';
import { companyAddressDataDto } from '.';

export const headerDataDto = (data: ICompanyData) => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  geo: findGeo(data?.addresses?.map((el) => companyAddressDataDto(el))),
});

export const basicInfoDataDto = (data: ICompanyData) => ({
  website: data?.website,
  ceo: data?.ceo,
  businessType: data?.businessType,
  ceoDocUrl: data?.ceoDocUrl,
});

export const legalInfoDataDto = (data: ICompanyData) => ({
  legalForm: data?.legalForm,
  qcEmployees: data?.qcEmployees,
  budgetOfYear: data?.budgetOfYear,
  yearOfFoundation: data?.yearOfFoundation,
  regDocUrl: data?.regDocUrl,
  issuingAuthority: data?.issuingAuthority,
  [data?.regNumName || 0]: data?.regNumber,
});

export const contactsIfoDataDto = (data: ICompanyData) => ({
  addresses: data?.addresses?.map((el) => companyAddressDataDto(el)),
  contacts: data?.contacts,
  messengers: data?.messengers,
});
