import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICompanyData } from '../../types';

export interface ICompaniesCatalog extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  data: {
  count: number;
  status: string;
  companies: ICompanyData[] | [];
  page: number;
};
  onGetMore: () => void;
}
