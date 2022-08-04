import { FC } from 'react';
import styles from './CompanyContactsList.module.css';
import { ICompanyContactsList } from './CompanyContactsList.props';

export const CompanyContactsList: FC<ICompanyContactsList> = ({
  title, data, className = '', ...props
}) => (
  <div className={`${styles.contacts} ${className}`} {...props}>
    <h2 className={styles.contacts__title}>{title}</h2>
    <ul className={styles.contacts__list}>
      {data.contacts.map((el) => (
        <li className={styles.contacts__listItem}>
          <p className={styles.contacts__fieldName}>{el.type}</p>
          <p className={styles.contacts__fieldValue}>{el.value}</p>
        </li>
      ))}
    </ul>
  </div>
);