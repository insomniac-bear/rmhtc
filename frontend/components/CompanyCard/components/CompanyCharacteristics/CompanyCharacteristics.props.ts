import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TBasicInfoData, TLegalInfoData, ICompanyData } from '../../types';

export interface ICompanyCharacteristics extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  data: ICompanyData;
  // eslint-disable-next-line no-unused-vars
  dto: (data: ICompanyData) => TBasicInfoData | TLegalInfoData;
}
