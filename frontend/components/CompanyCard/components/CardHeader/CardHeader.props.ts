import { StaticImageData } from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICompanyHeader extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  name?: string;
  description?: string;
  img?: string | StaticImageData ;
  alt?: string;
  geo?: string | null;
}
