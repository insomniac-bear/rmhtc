import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyContactsList extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data?: unknown;
  title?: string;
}
