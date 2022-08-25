import { FormHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IEditForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  hideForm?: () => void;
  isFormHidden?: boolean;
  item?: any;
  formType: 'patch' | 'add';
  fetchParams: {
    route: string;
    type: string;
  }
}
