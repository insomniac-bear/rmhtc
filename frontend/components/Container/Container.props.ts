import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isBackgroundLogo?: boolean;
}
