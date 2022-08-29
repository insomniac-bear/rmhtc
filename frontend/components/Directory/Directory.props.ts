/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TDirectory } from './types';

export interface IDirectory extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  directory: TDirectory;
  label: string;
  setDirectory: (arg: any) => void;
}
