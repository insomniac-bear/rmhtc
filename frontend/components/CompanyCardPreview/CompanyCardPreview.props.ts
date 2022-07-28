import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICard {
  id: string;
  name: string;
  type: string;
  createDate: string;
  toggled: boolean;
}

export interface ICompanyCardPreview extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: ICard;
}
