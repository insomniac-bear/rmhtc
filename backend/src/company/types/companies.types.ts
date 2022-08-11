import { IAddress } from 'src/address/types';
import { IContact } from 'src/contacts/types';
import { IMessenger } from 'src/messengers/types';

export type TModerated = 'idle' | 'pending' | 'success' | 'failed';
export type TQcEmployes = '0 - 50' | '51 - 100' | 'more than 100';
export type TBudgetOfYear =
  | '0 - 100 000'
  | '100 000 - 1 000 000'
  | '1 000 000 - 100 000 000'
  | 'more than 100 000 000';

export class ICompany {
  uuid?: string;
  name?: string;
  logoUrl?: string;
  regNumName?: string;
  regNumber?: string;
  regDocUrl?: string;
  issuingAuthority?: string;
  description?: string;
  yearOfFoundation?: number;
  website?: string;
  ceo?: string;
  ceoDocUrl?: string;
  qcEmployees?: TQcEmployes;
  budgetOfYear?: TBudgetOfYear;
  currencyOfBudget?: string;
  moderated?: TModerated;
  moderatedReason?: string;
}

export class IFullCompany extends ICompany {
  businessType?: string;
  legalForm?: string;
  addressess?: Array<IAddress>;
  contacts?: Array<IContact>;
  messengers?: Array<IMessenger>;
}
