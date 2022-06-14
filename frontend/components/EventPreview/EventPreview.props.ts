import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IEventPreviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isNew: boolean;
  title: string;
  date: string;
  address: {
    country: string;
    city: string;
    street: string;
    number: string;
  }
}
