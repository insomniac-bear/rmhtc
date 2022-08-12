import Link from 'next/link';
import { FC } from 'react';
import { Container } from '../../../Container/Container';
import { Title } from '../../../Title/Title';
import styles from './CompanyContactsList.module.css';
import { ICompanyContactsList } from './CompanyContactsList.props';

const mailRegex = /Email/;
export const CompanyContactsList: FC<ICompanyContactsList> = ({ title, data }) => (
  <Container className={styles.contacts}>
    <Title tag="h2" size="s" className={styles.contacts__title}>{title}</Title>
    <ul className={styles.contacts__list}>
      {data && data.addresses?.map((el) => (
        <li className={styles.contacts__listItem} key={el.uuid}>
          <p className={styles.contacts__name}>{el.type}</p>
          <p className={styles.contacts__value}>{el.value}</p>
        </li>
      ))}
      {data && data.messengers?.map((el) => (
        <li className={styles.contacts__listItem} key={el.uuid}>
          <p className={styles.contacts__name}>{el.type}</p>
          <Link href={el.value ? el.value : ''}><a className={styles.contacts__link}>{el.value}</a></Link>
        </li>
      ))}
      {data && data.contacts?.map((el) => (
        <li className={styles.contacts__listItem} key={el.uuid}>
          <p className={styles.contacts__name}>{el.type}</p>
          {el.type && mailRegex.test(el.type)
            ? <Link href={el.value ? el.value : ''}><a className={styles.contacts__link}>{el.value}</a></Link>
            : <Link href={el.value ? el.value : ''}><a className={styles.contacts__phoneLink}>{el.value}</a></Link>}
        </li>
      ))}
    </ul>
  </Container>
);
