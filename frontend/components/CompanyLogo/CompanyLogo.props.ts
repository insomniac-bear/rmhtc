import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyLogo extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number;
  alt: string | null;
  url: string | null;
}
