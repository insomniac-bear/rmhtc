import { FormHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IAddForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  label: string;
}
