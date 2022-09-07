import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOfferHeader extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  dto: any;
}
