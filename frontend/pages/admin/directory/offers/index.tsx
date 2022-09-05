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

  const { data: offersCategoriesRes, isLoading: isCategoriesLoading } = apiService.useGetOffersCategoriesQuery('');

  useEffect(() => {
    setOffersCategoriesDirectory({ values: offersCategoriesRes, fetchParams: { type: '', route: 'category' } });
  }, [offersCategoriesRes]);

  return (
    <div className={styles.container}>
      {isCategoriesLoading && <Loader />}
      {!isCategoriesLoading && (
        <ul className={styles.list}>
          <li>
            {offersCategoriesDirectory?.values && (
              <Directory directory={offersCategoriesDirectory} label="Offer category" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(OffersDirectoryPage);
