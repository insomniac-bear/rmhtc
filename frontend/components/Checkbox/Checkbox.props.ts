import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface ICheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children: string;
  name: string;
  required?: boolean;
}
