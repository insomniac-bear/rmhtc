import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICompanyData } from '../../CompanyCard.props';
import { TBasicInfoData, TLegalInfoData } from '../../constants';

export interface ICompanyCharacteristics extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  data: ICompanyData;
  // eslint-disable-next-line no-unused-vars
  dto: (data: ICompanyData) => TBasicInfoData | TLegalInfoData;
}
