import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TValue } from '../../types';

export interface IDirectoryItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: TValue;
  fetchParams: any;
}
