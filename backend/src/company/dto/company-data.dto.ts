import { TQcEmployes, TBudgetOfYear, TModerated } from '../types';
import { IAddress } from '../../address/types';
import { IMessenger } from 'src/messengers/types';

export class CompanyDataDto {
  name?: string;
  logoUrl: string;
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
  addressess?: Array<IAddress>;
  contacts?: Array<IMessenger>;
  businessType?: string;
  legalForm?: string;
}
