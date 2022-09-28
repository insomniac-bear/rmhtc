import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';

export interface ISearchFilter extends DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  label?: string;
  fieldName: string;
  placeholder?: string;
}
