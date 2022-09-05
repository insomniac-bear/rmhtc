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
    setOffersCategoriesDirectory({ values: offersCategoriesDirectory, fetchParams: { type: '', route: 'categories' } });
    console.log(offersCategoriesRes);
  }, [offersCategoriesRes]);

  return (
    <div className={styles.container}>
      {isCategoriesLoading && <Loader />}
      {/* {!isContactsLoading && !isMessengersLoading && (
        <ul className={styles.list}>
          <li>
            {contactsDirectory?.values && (
              <Directory directory={contactsDirectory} label="Contact" />
            )}
          </li>
          <li>
            {messengersDirectory?.values && (
              <Directory directory={messengersDirectory} label="Messenger" />
            )}
          </li>
        </ul>
      )} */}
    </div>
  );
};

export default withAuthLayout(OffersDirectoryPage);
