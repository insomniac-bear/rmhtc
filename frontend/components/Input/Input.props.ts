import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type?: 'text' | 'email' | 'password'| 'url';
  name: string;
  message?: string;
}
