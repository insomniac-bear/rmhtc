export interface IBusinessType {
  createdAt: string | null;
  updatedAt: string | null;
  uuid: string | null;
  value: string | null;
}

export interface ILegalForm {
  createdAt: string | null;
  shortValue: string | null;
  updatedAt: string | null;
  uuid: string | null;
  value: string | null;
}

export interface ICompanyContact {
  type: string | null;
  value: string | null;
  uuid: string;
}
export interface ICompanyAddress {
  postCode: number | null;
  country: string | null;
  city: string | null;
  street: string | null;
  buildNum: string | null;
  roomNum: string | null;
  addressType: string | null;
  uuid: string;
}
export interface ICompanyData {
  uuid: string;
  name: string | null;
  logoUrl: string | null;
  regNumber: string | null;
  regNumName: string | null;
  regDocUrl: string | null;
  issuingAuthority: string | null;
  description: string | null;
  yearOfFoundation: number | null;
  website: string | null;
  ceo: string | null;
  ceoDocUrl: string | null;
  qcEmployees: string | null;
  budgetOfYear: string | null;
  currencyOfBudget: string | null;
  moderated: string | null;
  moderatedReason: string | null;
  addresses: ICompanyAddress[] | [];
  legalForm: ILegalForm | null | undefined;
  businessType: IBusinessType | null | undefined;
  messengers: ICompanyContact[] | [];
  contacts: ICompanyContact[] | [];
}

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
  uuid: string;
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
  businessType: string | null | undefined;
  ceoDocUrl: string | null;
  [key: string]: string | null | undefined;
}

export type TLegalInfoData = {
  legalForm: string | null | undefined;
  qcEmployees: string | null;
  budgetOfYear: string | null;
  yearOfFoundation: number | null;
  regDocUrl: string | null;
  issuingAuthority: string | null;
  [key: string]: string | number | null | undefined;
}

export type TContactsData = {
  addresses: TNewAddress[] | [];
  contacts: ICompanyContact[] | [];
  messengers: ICompanyContact[] | [];
}
