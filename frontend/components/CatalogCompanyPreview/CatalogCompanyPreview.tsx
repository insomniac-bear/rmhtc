import Link from 'next/link';
import { FC } from 'react';
import { catalogPreviewDataDto } from '../../utils/companyDataDto/catalogCompanyDataDto';
import { CompanyLogo } from '../CompanyLogo/CompanyLogo';
import { Title } from '../Title/Title';
import styles from './CatalogCompanyPreview.module.css';
import { ICatalogCompanyPreview } from './CatalogCompanyPreview.props';

export const CatalogCompanyPreview: FC<ICatalogCompanyPreview> = ({ company, className = '', ...props }) => {
  const {
    name, logoUrl, description, geo,
  } = catalogPreviewDataDto(company);

  return (
    <div className={`${styles.card} ${className}`} {...props}>
      <CompanyLogo alt={`${name} logo`} url={logoUrl} className={styles.card__logo} size={44} />
      <Title size="s" tag="h2" className={styles.card__heading}>{name}</Title>
      <div className={styles.card__geo}><p className={styles.card__geoText}>{geo}</p></div>
      <p className={styles.card__description}>{description}</p>
      <ul className={styles.card__activities}>
        <li className={styles.activitiesItem}>
          <span className={styles.card__activityName}>News</span>
          <Link href="#"><a className={styles.card__activityLink}>8567</a></Link>
        </li>
        <li className={styles.activitiesItem}>
          <span className={styles.card__activityName}>Requests</span>
          <Link href="#"><a className={styles.card__activityLink}>34</a></Link>
        </li>
        <li className={styles.activitiesItem}>
          <span className={styles.card__activityName}>Offers</span>
          <Link href="#"><a className={styles.card__activityLink}>87 662</a></Link>
        </li>
      </ul>
    </div>
  );
};
