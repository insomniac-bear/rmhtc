import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { THeaderData } from '../../types';

export interface ICompanyHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  data: THeaderData;
}
