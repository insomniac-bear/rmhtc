import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  size: 's' | 'm' | 'l' ;
}
