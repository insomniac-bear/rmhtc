/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IDirectory extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  directory: any;
  label: string;
  setDirectory: (arg: any) => void;
}
