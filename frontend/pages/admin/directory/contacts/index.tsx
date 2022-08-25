/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';
import { directoryDataDto } from '../../../../utils/directoryDataDto';

const ContactsDirectoryPage: NextPage = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [getContacts] = adminAPI.useLazyGetAllContactsQuery();
  const [getMessengers] = adminAPI.useLazyGetAllMessengersQuery();

  useEffect(() => {
    Promise.all([getContacts(''), getMessengers('')]).then(([contacts, messengers]) => {
      setData(directoryDataDto([
        { values: contacts.data, fetchParams: { type: 'type', route: 'contacts' }, label: 'Contact' },
        { values: messengers.data, fetchParams: { type: 'type', route: 'messengers' }, label: 'Messenger' },
      ]));
    })
      .then(() => setIsLoading(false))
      .catch((err) => {
        throw new Error(err);
      });
  }, [getContacts, getMessengers]);

  console.log(data); // ------------------------

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {isLoading && !data && <Loader />}
        {data && data.map((obj: any) => (
          <li key={obj.id}>
            <Directory directory={obj} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuthLayout(ContactsDirectoryPage);
