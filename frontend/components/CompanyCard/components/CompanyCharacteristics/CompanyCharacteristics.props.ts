import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyCharacteristics extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  data: any;
  // eslint-disable-next-line no-unused-vars
  dto: (data: {[key: string]: string | number | null}) => any;
}
