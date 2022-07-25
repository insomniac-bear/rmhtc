import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IAuthLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
