/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { apiService } from '../../../../services/apiService';
import { Loader } from '../../../../components/Loader/Loader';

const OffersDirectoryPage: NextPage = () => {
  const [offersCategoriesDirectory, setOffersCategoriesDirectory] = useState<null | any>(null);
  const [currenciesDirectory, setCurrenciesDirectory] = useState<null | any>(null);

  const { data: offersCategoriesRes, isLoading: isCategoriesLoading } = apiService.useGetOffersCategoriesQuery('');
  const { data: currenciesRes, isLoading: isCurrenciesLoading } = apiService.useGetCurrenciesQuery('');

  useEffect(() => {
    setOffersCategoriesDirectory({ values: offersCategoriesRes, fetchParams: { type: '', route: 'category' } });
    setCurrenciesDirectory({ values: currenciesRes, fetchParams: { type: '', route: 'currency' } });
  }, [offersCategoriesRes, currenciesRes]);

  return (
    <div className={styles.container}>
      {isCategoriesLoading && isCurrenciesLoading && <Loader />}
      {!isCategoriesLoading && !isCurrenciesLoading && (
        <ul className={styles.list}>
          <li>
            {offersCategoriesDirectory?.values && (
              <Directory directory={offersCategoriesDirectory} label="Offer category" />
            )}
          </li>
          <li>
            {currenciesDirectory?.values && (
              <Directory directory={currenciesDirectory} label="Currency" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(OffersDirectoryPage);
