import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setCompanies } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Title } from '../Title/Title';
import styles from './CompaniesDashboard.module.css';
import { ICompaniesDashboardProps } from './CompaniesDashboard.props';

export const CompaniesDashboard: FC<ICompaniesDashboardProps> = ({ className, ...props }) => {
  const companies = useAppSelector((store) => store.user.userCompanies);
  const userCompaniesCounts = useAppSelector((store) => store.user.user.counts);
  const dispatch = useAppDispatch();

  const [getUserCompanies] = userAPI.useGetUserCompaniesMutation();

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response: any = await getUserCompanies('');
        dispatch(setCompanies(response.data.companies));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
  }, [dispatch, getUserCompanies]);

  return (
    <div className={`${styles.companiesDashboard} ${className}`} {...props}>
      <Container className={styles.companiesDashboard__digits} isBackgroundLogo>
        <ul className={styles.companiesDashboard__digitsList}>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter} ${styles.companiesDashboard__counter_size_l}`}>
              {userCompaniesCounts && userCompaniesCounts.companyCount}
            </p>
            <p className={`${styles.companiesDashboard__caption} ${styles.companiesDashboard__caption_size_l}`}>
              companies
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              {userCompaniesCounts && userCompaniesCounts.moderatedCompanyCount}
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              Active
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              {userCompaniesCounts && userCompaniesCounts.idleModerateCompanyCount}
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              In moderation process
            </p>
          </li>
          <li className={styles.companiesDashboard__digitsItem}>
            <p className={`${styles.companiesDashboard__counter}`}>
              {userCompaniesCounts && userCompaniesCounts.failedModerateCompanyCount}
            </p>
            <p className={`${styles.companiesDashboard__caption}`}>
              Didn’t pass moderation
            </p>
          </li>
        </ul>
      </Container>
      {!!companies.length && (
        <ul className={styles.companiesDashboard__companiesList}>
          {companies.map((company: any) => (
            <li key={company.uuid}>
              <Container className={styles.companiesDashboard__company}>
                <Title tag="h3" size="s" className={styles.companiesDashboard__companyTitle}>{company.name}</Title>
                <Link href={`/objects/companies/edit/${company.uuid}`} passHref>
                  <Button className={styles.companiesDashboard__companyDataBtn} type="button">Fill the data</Button>
                </Link>
              </Container>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
