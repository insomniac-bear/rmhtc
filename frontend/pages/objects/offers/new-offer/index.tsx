import { NextPage } from 'next';
import { NewOfferForm } from '../../../../components/NewOfferForm/NewOfferForm';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import styles from './NewOfferPage.module.css';

const NewOfferPage: NextPage = () => (
  <NewOfferForm className={styles.newOfferPage__form} />
);

export default withAuthLayout(NewOfferPage);
