/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';

const ContactsDirectoryPage: NextPage = () => {
  const [contactsDirectory, setContactsDirectory] = useState<null | any>(null);
  const [messengersDirectory, setMessengersDirectory] = useState<null | any>(null);

  const { data: contactsRes, isLoading: isContactsLoading } = adminAPI.useGetAllContactsQuery('');
  const { data: messengersRes, isLoading: isMessengersLoading } = adminAPI.useGetAllMessengersQuery('');

  useEffect(() => {
    setContactsDirectory({ values: contactsRes, fetchParams: { type: 'type', route: 'contacts', label: 'types' } });
    setMessengersDirectory({ values: messengersRes, fetchParams: { type: 'type', route: 'messengers', label: 'types' } });
  }, [contactsRes, messengersRes]);

  return (
    <div className={styles.container}>
      {isContactsLoading && isMessengersLoading && <Loader />}
      {!isContactsLoading && !isMessengersLoading && (
        <ul className={styles.list}>
          <li>
            {contactsDirectory?.values && (
              <Directory directory={contactsDirectory} setDirectory={setContactsDirectory} label="Contact" />
            )}
          </li>
          <li>
            {messengersDirectory?.values && (
              <Directory directory={messengersDirectory} setDirectory={setMessengersDirectory} label="Messenger" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(ContactsDirectoryPage);
