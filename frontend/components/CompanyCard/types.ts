import { ICompanyContact } from '../../types';

export type TNewAddress = {
  type: string | null;
  address: {
    postCode: number | null;
    country: string | null;
    city: string | null;
    street: string | null;
    buildNum: string | null;
    roomNum: string | null;
  };
  value: string | null;
  uuid: string;
};
export type THeaderData = {
  logoUrl: string | null;
  name: string | null;
  description: string | null;
  geo: string | null;
};

export type TBasicInfoData = {
  website: string | null;
  ceo: string | null;
  businessType: string | null | undefined;
  ceoDocUrl: string | null;
  [key: string]: string | null | undefined;
};

export type TLegalInfoData = {
  legalForm: string | null | undefined;
  qcEmployees: string | null;
  budgetOfYear: string | null;
  yearOfFoundation: number | null;
  regDocUrl: string | null;
  issuingAuthority: string | null;
  [key: string]: string | number | null | undefined;
};

export type TContactsData = {
<<<<<<< HEAD
  addresses: TNewAddress[];
  contacts: ICompanyContact[];
  messengers: ICompanyContact[];
};
=======
  addresses: TNewAddress[] | [];
  contacts: ICompanyContact[] | [];
  messengers: ICompanyContact[] | [];
}
>>>>>>> 82888e1cab13a9c9ee21feee14c8be0b75912beb
