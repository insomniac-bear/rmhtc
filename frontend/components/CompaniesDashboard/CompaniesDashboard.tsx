/* eslint-disable arrow-body-style */
import Link from 'next/link';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Title } from '../Title/Title';
import styles from './CompaniesDashboard.module.css';
import { ICompaniesDashboardProps } from './CompaniesDashboard.props';

export const CompaniesDashboard: FC<ICompaniesDashboardProps> = ({ className, ...props }) => {
  return (
    <div className={`${styles.companiesDashboard} ${className}`} {...props}>
      <Container className={styles.companiesDashboard__digits} isBackgroundLogo>
        <ul className={styles.companiesDashboard__digitsList}>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter} ${styles.companiesDashboard__counter_size_l}`}>
              2000
            </p>
            <p className={`${styles.companiesDashboard__caption} ${styles.companiesDashboard__caption_size_l}`}>
              companies
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              2000
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              Active
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              2000
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              In moderation process
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              2000
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              Didn’t pass moderation
            </p>
          </li>
        </ul>
      </Container>
      <Container className={styles.companiesDashboard__company}>
        <Title tag="h3" size="s" className={styles.companiesDashboard__companyTitle}>Roga Invest Holding Enterprise</Title>
        <Link href="/" passHref>
          <Button className={styles.companiesDashboard__companyDataBtn} type="button">Fill the data</Button>
        </Link>
      </Container>
    </div>
  );
};
