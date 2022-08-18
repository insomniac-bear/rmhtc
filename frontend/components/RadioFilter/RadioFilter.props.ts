import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

type TFilter = {
  id: string | number;
  value: string | number;
  label: string | number;
}

export interface IRadioFilter extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  filters: TFilter[];
  label?: string;
  name: string;
  htmlType: 'radio' | 'checkbox';
}
