import { DetailedHTMLProps, FieldsetHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface IPriceFilter extends DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  register: UseFormRegister<any>;
  control: any;
}
