import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IOfferCard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   access: 'general' | 'admin';
}
