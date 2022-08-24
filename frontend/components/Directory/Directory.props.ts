import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IDirectory extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  obj: any;
}
