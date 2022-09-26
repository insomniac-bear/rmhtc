import { FC } from 'react';
import Image from 'next/image';
import styles from './CompanyLogo.module.css';
import { ICompanyLogo } from './CompanyLogo.props';

export const CompanyLogo: FC<ICompanyLogo> = ({
  alt, url, className = '', size = 70, ...props
}) => (
  <div
    style={{
      width: size,
      height: size,
    }}
    className={`${styles.wrapper} ${className}`}
    {...props}
  >
    <Image
      // className={styles.logo}
      src={url || '/images/logo-placeholder.svg'}
      alt={alt || 'Company logo'}
      layout="fill"
    />
  </div>
);
