import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

type TFilter = {
  id: string | number;
  value: string;
  label: string;
}

export interface ICheckboxFilter extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  filters: TFilter[];
  label?: string;
}
