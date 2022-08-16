import Link from 'next/link';
import { FC } from 'react';
import { CatalogCompanyPreview } from '../CatalogCompanyPreview/CatalogCompanyPreview';
import styles from './Catalog.module.css';
import { ICatalog } from './Catalog.props';

export const Catalog: FC<ICatalog> = ({ className = '', ...props }) => (
  <div className={styles.catalog}>
    <ul className={`${styles.catalog__itemsList} ${className}`} {...props}>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
      <Link href=""><a><CatalogCompanyPreview /></a></Link>
    </ul>
    <button className={styles.catalog__moreButton} type="button">Show more</button>
  </div>
);
