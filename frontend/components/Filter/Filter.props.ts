import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface IFilter extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  filters: Array<string>;
}
