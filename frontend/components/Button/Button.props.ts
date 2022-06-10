import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  appearance: 'ghost' | 'primary';
}
