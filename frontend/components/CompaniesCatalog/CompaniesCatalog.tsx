import { FC } from 'react';
import Link from 'next/link';
import styles from './CompaniesCatalog.module.css';
import { ICompaniesCatalog } from './CompaniesCatalog.props';
import { ICompanyData } from '../../types';
import { CatalogCompanyPreview } from '../CatalogCompanyPreview/CatalogCompanyPreview';

export const CompaniesCatalog: FC<ICompaniesCatalog> = ({
  data, onGetMore, className = '', ...props
}) => (
  <div className={styles.catalog}>
    <ul className={`${styles.catalog__itemsList} ${className}`} {...props}>
      {data.companies.map((item: ICompanyData) => (
        <li key={item.uuid}>
          <Link href={`/catalog/companies/company/${item.uuid}`} passHref>
            <a>
              <CatalogCompanyPreview company={item} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
    {data.count > 9 && data.companies.length !== data.count && (
      <button className={styles.catalog__moreButton} onClick={onGetMore} type="button">
        Show more
      </button>
    )}
  </div>
);
