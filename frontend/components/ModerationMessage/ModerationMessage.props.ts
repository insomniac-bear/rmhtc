import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IModerationMessage extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: string;
}
