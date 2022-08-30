/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';

const AddressesDirectoryPage: NextPage = () => {
  const [countriesDirectory, setCountriesDirectory] = useState<null | any>(null);
  const [citiesDirectory, setCitiesDirectory] = useState<null | any>(null);
  const [addressDirectory, setAddressDirectory] = useState<null | any>(null);

  const { data: countriesRes, isLoading: isCountriesLoading } = adminAPI.useGetAllCountriesQuery('');
  const { data: citiesRes, isLoading: isCitiesLoading } = adminAPI.useGetAllCitiesQuery('');
  const { data: addressRes, isLoading: isAddressLoading } = adminAPI.useGetAddressesTypesQuery('');

  useEffect(() => {
    setCountriesDirectory({ values: countriesRes, fetchParams: { type: 'country', route: 'address', label: 'countries' } });
    setCitiesDirectory({ values: citiesRes, fetchParams: { type: 'city', route: 'address', label: 'cities' } });
    setAddressDirectory({ values: addressRes, fetchParams: { type: 'type', route: 'address', label: 'types' } });
  }, [countriesRes, citiesRes, addressRes]);

  return (
    <div className={styles.container}>
      {isCountriesLoading && isCitiesLoading && isAddressLoading && <Loader />}
      {!isCountriesLoading && !isCitiesLoading && !isAddressLoading && (
        <ul className={styles.list}>
          <li>
            {countriesDirectory?.values && (
              <Directory directory={countriesDirectory} setDirectory={setCountriesDirectory} label="Country" />
            )}
          </li>
          <li>
            {citiesDirectory?.values && (
              <Directory directory={citiesDirectory} setDirectory={setCitiesDirectory} label="City" />
            )}
          </li>
          <li>
            {addressDirectory?.values && (
              <Directory directory={addressDirectory} setDirectory={setAddressDirectory} label="Address" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(AddressesDirectoryPage);
