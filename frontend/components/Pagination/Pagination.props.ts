import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPagination extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  currentPage: number;
  pageNumbers: number[];
  // eslint-disable-next-line no-unused-vars
  goToPage: (num: number) => void;
  goBack: () => void;
  goForward: () => void;
}
