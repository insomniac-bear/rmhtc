import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICompanyData } from '../../types';

export interface ICatalogCompanyPreview extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  company: ICompanyData;
}
