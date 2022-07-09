import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IProfileLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
