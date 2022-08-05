import { ICompanyAddress, ICompanyContact, ICompanyData } from './CompanyCard.props';

export type TNewAddress = {
  type: string | null;
  address: {
    postCode: number | null;
    country: string | null;
    city: string | null;
    street: string | null;
    buildNum: string | null;
    roomNum: string | null;
  },
  value: string | null;
}
export type THeaderData = {
  logoUrl: string | null;
  name: string | null;
  description: string | null;
  geo: string | null;
}

export type TBasicInfoData = {
  website: string | null;
  ceo:string | null;
  bussinesType: string | null;
  ceoDocUrl: string | null;
  [key: string]: string | null;
}

export type TLegalInfoData = {
  legalForm: string | null;
  qcEmployees: string | null;
  budgetOfYear: string | null;
  yearOfFoundation: number | null;
  regDocUrl: string | null;
  issuingAuthority: string | null;
  [key: string]: string | number | null;
}

export type TContactsData = {
  addresses: TNewAddress[];
  contacts: ICompanyContact[];
  messangers: ICompanyContact[];
}
// добавить возможность настройки актуального адреса?
export const findGeo = (arr: TNewAddress[]): string | null => {
  const current = arr.find((el: any) => el.addressType === 'Legal' || 'Actual' || 'Mailing');
  if (typeof current !== 'undefined') {
    return `${current.address.country}, ${current.address.city}`;
  }
  return null;
};

export const addressDataDto = (data: ICompanyAddress): TNewAddress => ({
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
});

export const headerDataDto = (data: ICompanyData): THeaderData => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  geo: findGeo(data?.addresses.map((el) => addressDataDto(el))),
});

export const basicInfoDataDto = (data: ICompanyData): TBasicInfoData => ({
  website: data?.website,
  ceo: data?.ceo,
  bussinesType: data?.bussinesType,
  ceoDocUrl: data?.ceoDocUrl,
});

export const legalInfoDataDto = (data: ICompanyData): TLegalInfoData => ({
  legalForm: data?.legalForm,
  qcEmployees: data?.qcEmployees,
  budgetOfYear: data?.budgetOfYear,
  yearOfFoundation: data?.yearOfFoundation,
  regDocUrl: data?.regDocUrl,
  issuingAuthority: data?.issuingAuthority,
  [data?.regNumName || 0]: data?.regNumber,
});

export const contactsIfoDataDto = (data: ICompanyData): TContactsData => ({
  addresses: data?.addresses.map((el) => addressDataDto(el)),
  contacts: data?.contacts,
  messangers: data?.messangers,
});
