import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  geo?: string | null;
  data: any;
}
