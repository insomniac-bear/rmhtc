import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IModerationStatusListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  active: number;
  inProgress: number;
  declined: number;
}
