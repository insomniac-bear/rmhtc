/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { apiService } from '../../../../services/apiService';
import { Loader } from '../../../../components/Loader/Loader';

const ContactsDirectoryPage: NextPage = () => {
  const [contactsDirectory, setContactsDirectory] = useState<null | any>(null);
  const [messengersDirectory, setMessengersDirectory] = useState<null | any>(null);

  const { data: contactsRes, isLoading: isContactsLoading } = apiService.useGetContactsTypesQuery('');
  const { data: messengersRes, isLoading: isMessengersLoading } = apiService.useGetMessengersTypesQuery('');

  useEffect(() => {
    setContactsDirectory({ values: contactsRes, fetchParams: { endpoint: 'type', route: 'contacts' } });
    setMessengersDirectory({ values: messengersRes, fetchParams: { endpoint: 'type', route: 'messengers' } });
  }, [contactsRes, messengersRes]);

  return (
    <div className={styles.container}>
      {isContactsLoading && isMessengersLoading && <Loader />}
      {!isContactsLoading && !isMessengersLoading && (
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
      )}
    </div>
  );
};

export default withAuthLayout(ContactsDirectoryPage);
