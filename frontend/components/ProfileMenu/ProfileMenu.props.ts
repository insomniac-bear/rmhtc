import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IProfileMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menuData: any;
}
