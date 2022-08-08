import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TContactsData } from '../../types';

export interface ICompanyContactsList extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data?: TContactsData;
  title?: string;
}
