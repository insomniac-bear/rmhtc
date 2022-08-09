import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface INewCompanyFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  company?: any;
}
