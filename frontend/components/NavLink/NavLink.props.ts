import { ReactNode } from 'react';

export interface INavLink {
  children: ReactNode;
  exact?: boolean;
  href: string;
  className?: string;
  activeClass?: string;
}
