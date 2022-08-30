/* eslint-disable no-unused-vars */
import { FormHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IEditForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  hideForm?: () => void;
  setDirectory: (arg: any) => void;
  isFormHidden?: boolean;
  item?: any;
  formType: 'patch' | 'add';
  fetchParams: {
    route: string;
    type: string;
    label: string;
  }
}
