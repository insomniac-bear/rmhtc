import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyCard extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export interface ICompanyContact {
  type: string | null;
  value: string | null;
}
export interface ICompanyAddress {
  postCode: number | null,
  country: string | null,
  city: string | null,
  street: string | null,
  buildNum: string | null,
  roomNum: string | null,
  addressType: string | null,
}
export interface ICompanyData {
  uuid: string,
  name: string | null,
  logoUrl: string | null,
  regNumber: string | number | null,
  regNumName: string | null,
  regDocUrl: string | null,
  issuingAuthority: string | null,
  description: string | null,
  yearOfFoundation: number | null,
  website: string | null,
  ceo: string | null,
  ceoDocUrl: string | null,
  qcEmployees: string | null,
  budgetOfYear: string | null,
  currencyOfBudget: string | null,
  moderated: string | null,
  moderatedReason: string | null,
  addresses: ICompanyAddress[],
  legalForm: string | null,
  bussinesType: string | null,
  messangers: ICompanyContact[],
  contacts: ICompanyContact[],
}
