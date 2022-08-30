/* eslint-disable no-unused-vars */
import { FormHTMLAttributes, DetailedHTMLProps } from 'react';
import { TFetchParams, TValue } from '../../types';

export interface IEditForm extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  hideForm?: () => void;
  setDirectory: (arg: any) => void;
  isFormHidden?: boolean;
  item?: TValue;
  formType: 'patch' | 'add';
  fetchParams: TFetchParams;
}
