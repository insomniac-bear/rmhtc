import { TQcEmployees, TBudgetOfYear, TModerated } from '../types';
import { IAddress } from '../../address/types';
import { IMessenger } from 'src/messengers/types';
import { IContact } from 'src/contacts/types';

export class CompanyDataDto {
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
  qcEmployees?: TQcEmployees;
  budgetOfYear?: TBudgetOfYear;
  currencyOfBudget?: string;
  moderated?: TModerated;
  moderatedReason?: string;
  moderatedAuthorUuid?: string;
  addresses?: Array<IAddress>;
  contacts?: Array<IContact>;
  messengers?: Array<IMessenger>;
  businessType?: string;
  legalForm?: string;
}
