import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface ISearchFilter extends DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  label?: string;
  fieldName: string;
  placeholder?: string;
  register: UseFormRegister<any>
}
