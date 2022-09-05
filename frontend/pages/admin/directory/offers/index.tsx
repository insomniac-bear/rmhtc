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
  const [offerTypesDirectory, setOfferTypesDirectory] = useState<null | any>(null);

  const { data: offersCategoriesRes, isLoading: isCategoriesLoading } = apiService.useGetOffersCategoriesQuery('');
  const { data: currenciesRes, isLoading: isCurrenciesLoading } = apiService.useGetCurrenciesQuery('');
  const { data: offerTypesRes, isLoading: isOfferTypesLoading } = apiService.useGetOfferTypesQuery('');

  useEffect(() => {
    setOffersCategoriesDirectory({ values: offersCategoriesRes, fetchParams: { type: '', route: 'category' } });
    setCurrenciesDirectory({ values: currenciesRes, fetchParams: { type: '', route: 'currency' } });
    setOfferTypesDirectory({ values: offerTypesRes, fetchParams: { type: 'type', route: 'offer' } });
  }, [offersCategoriesRes, currenciesRes, offerTypesRes]);

  return (
    <div className={styles.container}>
      {isCategoriesLoading && isCurrenciesLoading && isOfferTypesLoading && <Loader />}
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
          <li>
            {offerTypesDirectory?.values && (
              <Directory directory={offerTypesDirectory} label="Offer" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(OffersDirectoryPage);
