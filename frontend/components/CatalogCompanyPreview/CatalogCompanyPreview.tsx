import Link from 'next/link';
import { FC } from 'react';
import { CompanyLogo } from '../CompanyLogo/CompanyLogo';
import styles from './CatalogCompanyPreview.module.css';
import { ICatalogCompanyPreview } from './CatalogCompanyPreview.props';

export const CatalogCompanyPreview: FC<ICatalogCompanyPreview> = ({ className = '', ...props }) => (
  <li className={`${styles.card} ${className}`} {...props}>
    <CompanyLogo alt="Logo" url={null} className={styles.card__logo} size={44} />
    <h5 className={styles.card__heading}>Roga Invest Holding</h5>
    <div className={styles.card__geo}><p className={styles.card__geoText}>Russia, Ivdel</p></div>
    <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ut?</p>
    <ul className={styles.card__activities}>
      <li className={styles.activitiesItem}>
        <span className={styles.card__activityName}>News</span>
        <Link href="companies"><a className={styles.card__activityLink}>8567</a></Link>
      </li>
      <li className={styles.activitiesItem}>
        <span className={styles.card__activityName}>Requests</span>
        <Link href="companies"><a className={styles.card__activityLink}>34</a></Link>
      </li>
      <li className={styles.activitiesItem}>
        <span className={styles.card__activityName}>Offers</span>
        <Link href="companies"><a className={styles.card__activityLink}>87 662</a></Link>
      </li>
    </ul>
  </li>
);
