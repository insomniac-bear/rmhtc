import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IRadioProps extends DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  onChange?: () => void
  name: string;
  value: string;
  errors?: any;
  isValidated?: boolean;
  checked?: boolean;
}
