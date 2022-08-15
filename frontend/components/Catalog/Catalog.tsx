import { FC } from 'react';
import { CatalogCompanyPreview } from '../CatalogCompanyPreview/CatalogCompanyPreview';
import styles from './Catalog.module.css';
import { ICatalog } from './Catalog.props';

export const Catalog: FC<ICatalog> = ({ className = '', ...props }) => (
  <ul className={`${styles.catalog} ${className}`} {...props}>
    <CatalogCompanyPreview />
  </ul>
);
