import { FC } from 'react';
import styles from './CompaniesCatalog.module.css';
import { ICompaniesCatalog } from './CompaniesCatalog.props';
import { catalogMokData } from './catalogMokData';
import { ICompanyData } from '../../types';
import { CatalogCompanyPreview } from '../CatalogCompanyPreview/CatalogCompanyPreview';

export const CompaniesCatalog: FC<ICompaniesCatalog> = ({ className = '', ...props }) => (
  <div className={styles.catalog}>
    <ul className={`${styles.catalog__itemsList} ${className}`} {...props}>
      {catalogMokData.map((item: ICompanyData) => <li key={item.uuid}><CatalogCompanyPreview company={item} /></li>)}
    </ul>
    <button className={styles.catalog__moreButton} type="button">
      Show more
    </button>
  </div>
);
