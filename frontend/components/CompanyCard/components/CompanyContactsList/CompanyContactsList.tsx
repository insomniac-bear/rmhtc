import { FC } from 'react';
import styles from './CompanyContactsList.module.css';
import { ICompanyContactsList } from './CompanyContactsList.props';

const mailRegex = /Email/;
export const CompanyContactsList: FC<ICompanyContactsList> = ({
  title, data, className = '', ...props
}) => (
  <div className={`${styles.contacts} ${className}`} {...props}>
    <h2 className={styles.contacts__title}>{title}</h2>
    <ul className={styles.contacts__list}>
      {data && data.addresses.map((el) => (
        <li className={styles.contacts__listItem}>
          <p className={styles.contacts__name}>{el.type}</p>
          <p className={styles.contacts__value}>{el.value}</p>
        </li>
      ))}
      {data && data.messangers.map((el) => (
        <li className={styles.contacts__listItem}>
          <p className={styles.contacts__name}>{el.type}</p>
          <a href={el.value ? el.value : ''} className={styles.contacts__link}>{el.value}</a>
        </li>
      ))}
      {data && data.contacts.map((el) => (
        <li className={styles.contacts__listItem}>
          <p className={styles.contacts__name}>{el.type}</p>
          {el.type && mailRegex.test(el.type)
            ? <a href={el.value ? el.value : ''} className={styles.contacts__link}>{el.value}</a>
            : <a href={el.value ? el.value : ''} className={styles.contacts__phoneLink}>{el.value}</a>}
        </li>
      ))}
    </ul>
  </div>
);
