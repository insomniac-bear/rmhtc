import { NextPage } from 'next';
import { NewCompanyForm } from '../../../../components/NewCompanyForm/NewCompanyForm';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import styles from './NewCompanyPage.module.css';

const NewCompanyPage: NextPage = () => (
  <NewCompanyForm className={styles.newCompanyPage__form} />
);

export default withAuthLayout(NewCompanyPage);
