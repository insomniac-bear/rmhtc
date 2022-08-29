/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IDirectoryItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: any;
  fetchParams: any;
  setDirectory: (arg: any) => void;
}
