import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyCard extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  access: 'general' | 'admin';
}
