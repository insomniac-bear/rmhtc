import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOfferCardDescription extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  dto: any;
}
