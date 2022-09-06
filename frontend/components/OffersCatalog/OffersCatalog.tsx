import { FC } from 'react';
import { CatalogOfferPreview } from '../CatalogOfferPreview/CatalogOfferPreview';
import styles from './OffersCatalog.module.css';
import { IOffersCatalog } from './OffersCatalog.props';

export const OffersCatalog: FC<IOffersCatalog> = ({
  className = '', ...props
}) => (
  <div className={styles.catalog}>
    <ul className={`${styles.catalog__itemsList} ${className}`} {...props}>
      <li className={styles.catalog__item}>
        <CatalogOfferPreview />
      </li>
    </ul>
    <button className={styles.catalog__moreButton} type="button">
      Show more
    </button>
  </div>
);
