import { FormHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IEditForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  value: string;
}
