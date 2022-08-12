import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMenuData } from './types';

export interface IProfileMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menuData: IMenuData[];
}
