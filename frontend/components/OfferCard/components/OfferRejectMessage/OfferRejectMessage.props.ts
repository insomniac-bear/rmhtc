import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOfferRejectMessage extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: string;
}
