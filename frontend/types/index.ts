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
  addresses: ICompanyAddress | [];
  budgetOfYear: string | null;
  businessType: string | null;
  ceo: string | null;
  ceoDocUrl: string | null;
  contacts: ICompanyContact | [];
  createdAt: string | null;
  currencyOfBudget: string | null;
  description: string | null;
  issuingAuthority: string | null;
  legalForm: string | null;
  logoUrl: string | null;
  messengers: ICompanyContact | [];
  moderated: string | null;
  moderatedAuthorUuid: string | null;
  moderatedReason: string | null;
  name: string | null;
  presentationUrl: string | null;
  qcEmployees: string | null;
  regDocUrl: string | null;
  regNumName: string | null;
  regNumber: string | null;
  shortLegalForm: string | null;
  uuid: string | null;
  website: string | null;
  yearOfFoundation: string | null;
}
