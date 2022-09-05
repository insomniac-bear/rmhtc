/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { Loader } from '../../../../components/Loader/Loader';
import { apiService } from '../../../../services/apiService';

const AddressesDirectoryPage: NextPage = () => {
  const [countriesDirectory, setCountriesDirectory] = useState<null | any>(null);
  const [citiesDirectory, setCitiesDirectory] = useState<null | any>(null);
  const [addressDirectory, setAddressDirectory] = useState<null | any>(null);

  const { data: countriesRes, isLoading: isCountriesLoading } = apiService.useGetCountriesQuery('');
  const { data: citiesRes, isLoading: isCitiesLoading } = apiService.useGetCitiesQuery('');
  const { data: addressRes, isLoading: isAddressLoading } = apiService.useGetAddressesTypesQuery('');

  useEffect(() => {
    setCountriesDirectory({ values: countriesRes, fetchParams: { endpoint: 'country', route: 'address' } });
    setCitiesDirectory({ values: citiesRes, fetchParams: { endpoint: 'city', route: 'address' } });
    setAddressDirectory({ values: addressRes, fetchParams: { endpoint: 'type', route: 'address' } });
  }, [countriesRes, citiesRes, addressRes]);

  return (
    <div className={styles.container}>
      {isCountriesLoading && isCitiesLoading && isAddressLoading && <Loader />}
      {!isCountriesLoading && !isCitiesLoading && !isAddressLoading && (
        <ul className={styles.list}>
          <li>
            {countriesDirectory?.values && (
              <Directory directory={countriesDirectory} label="Country" />
            )}
          </li>
          <li>
            {citiesDirectory?.values && (
              <Directory directory={citiesDirectory} label="City" />
            )}
          </li>
          <li>
            {addressDirectory?.values && (
              <Directory directory={addressDirectory} label="Address" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(AddressesDirectoryPage);
