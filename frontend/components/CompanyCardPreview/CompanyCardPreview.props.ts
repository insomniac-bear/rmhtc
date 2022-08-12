import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICard {
  uuid: string;
  name: string;
  createdAt: string;
  toggled: boolean;
}

export interface ICompanyCardPreview extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: ICard;
  type: 'Company' | 'Offer' | 'Requests' | 'News';
}
