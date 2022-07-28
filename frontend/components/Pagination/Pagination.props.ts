import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPagination extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  pageNumbers: number[];
  goToPage: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
}
