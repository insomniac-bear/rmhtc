/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPagination extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  pageNumbers: number[];
  goToPage: (num: number) => void;
  goBack: () => void;
  goForward: () => void;
}
