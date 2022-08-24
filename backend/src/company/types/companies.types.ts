import { IRawAddress } from 'src/address/types/rawAddress.interface';
import { IContact } from 'src/contacts/types';
import { IMessenger } from 'src/messengers/types';

export type TModerated = 'idle' | 'pending' | 'process' | 'success' | 'failed';
export type TQcEmployees = '0 - 50' | '51 - 100' | 'more than 100';
export type TBudgetOfYear =
  | '0 - 100 000'
  | '100 000 - 1 000 000'
  | '1 000 000 - 100 000 000'
  | 'more than 100 000 000';

export class ICompany {
  uuid?: string;
  name?: string;
  logoUrl?: string;
  presentationUrl?: string;
  regNumName?: string;
  regNumber?: string;
  regDocUrl?: string;
  issuingAuthority?: string;
  description?: string;
  yearOfFoundation?: number;
  website?: string;
  ceo?: string;
  ceoDocUrl?: string;
  qcEmployees?: TQcEmployees;
  budgetOfYear?: TBudgetOfYear;
  currencyOfBudget?: string;
  moderated?: TModerated;
  moderatedReason?: string;
}

export class IFullCompany extends ICompany {
  businessTypeUuid?: string;
  legalFormUuid?: string;
  addresses?: Array<IRawAddress>;
  contacts?: Array<IContact>;
  messengers?: Array<IMessenger>;
}
