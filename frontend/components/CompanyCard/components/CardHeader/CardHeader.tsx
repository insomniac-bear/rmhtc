import { FC } from 'react';
import Image from 'next/image';
import styles from './CardHeader.module.css';
import logoPlaceholder from '../../logoPlaceholder.png';
import { ICompanyHeader } from './CardHeader.props';

export const CardHeader: FC<ICompanyHeader> = ({
  data, className = '', ...props
}) => (
  <article className={`${styles.header} ${className}`} {...props}>
    <Image
      className={styles.header__logo}
      src={data.logoUrl ? data.logoUrl : logoPlaceholder}
      alt={data.name}
      width={70}
      height={70}
    />
    <div className={styles.header__nameWrapper}>
      <h1 className={styles.header__name}>{data.name}</h1>
      {data.geo && <div className={styles.header__geo}><p className={styles.header__geoText}>{data.geo}</p></div>}
    </div>
    <p className={styles.header__description}>{data.description}</p>
  </article>
);
