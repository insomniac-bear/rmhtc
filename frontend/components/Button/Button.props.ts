import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  appearance: 'ghost' | 'primary';
}
