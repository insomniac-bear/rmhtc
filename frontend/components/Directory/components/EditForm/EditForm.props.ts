import { FormHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IEditForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  label?: string;
  onAdd?: () => void;
  isFormHidden?: boolean;
}
