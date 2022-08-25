/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';
import { directoryDataDto } from '../../../../utils/directoryDataDto';

const AddressesDirectoryPage: NextPage = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [getCountries] = adminAPI.useLazyGetAllCountriesQuery();
  const [getCities] = adminAPI.useLazyGetAllCitiesQuery();
  const [getAddressesTypes] = adminAPI.useLazyGetAddressesTypesQuery();

  useEffect(() => {
    Promise.all([getCountries(''), getCities(''), getAddressesTypes('')]).then(([countries, cities, addressesTypes]) => {
      setData(directoryDataDto([
        { values: countries.data, fetchParams: { type: 'country', route: 'address' }, label: 'Country' },
        { values: cities.data, fetchParams: { type: 'city', route: 'address' }, label: 'City' },
        { values: addressesTypes.data, fetchParams: { type: 'type', route: 'address' }, label: 'Address' },
      ]));
    })
      .then(() => setIsLoading(false))
      .catch((err) => {
        throw new Error(err);
      });
  }, [getAddressesTypes, getCountries, getCities]);

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

export default withAuthLayout(AddressesDirectoryPage);
