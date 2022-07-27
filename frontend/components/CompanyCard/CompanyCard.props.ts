import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyCard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: {
    id: string;
    name: string;
    type: string;
    createDate: string;
    toggled: boolean;
  };
}
