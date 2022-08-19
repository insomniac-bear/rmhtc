import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

type TFilter = {
  id: string | number;
  value: string;
  label: string;
}

export interface ICheckboxFilter extends DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  filters: TFilter[];
  label?: string;
  fieldName: string;
  register: UseFormRegister<any>
}
