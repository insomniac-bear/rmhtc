import { StaticImageData } from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ILogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number;
  src?: StaticImageData | string;
  alt?: string;
}
