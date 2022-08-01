import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface IFilter extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  filters: string[];
  name: string;
  htmlType: 'radio' | 'checkbox';
}
