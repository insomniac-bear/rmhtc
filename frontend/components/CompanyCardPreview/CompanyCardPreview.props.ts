import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICompanyData } from '../../types';

export interface ICompanyCardPreview extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: ICompanyData;
  type: 'Company' | 'Offer' | 'Requests' | 'News';
}
