/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPagination extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  goToPage: (num: number) => void;
  count: number;
  offset: number;
}
