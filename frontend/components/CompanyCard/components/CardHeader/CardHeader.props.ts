import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { THeaderData } from '../../constants';

export interface ICompanyHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  data: THeaderData;
}
