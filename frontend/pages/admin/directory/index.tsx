/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './DirectoryPage.module.css';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../components/Directory/Directory';
import { adminAPI } from '../../../services/adminService';

const addressesDataDto = (dataArr: any) => dataArr.map((el: any) => ({ id: nanoid(), values: el.values, type: el.type }));

const DirectoryPage: NextPage = () => {
  const [data, setData] = useState(null);

  const [getAddressesTypes] = adminAPI.useLazyGetAddressesTypesQuery();
  const [getCountries] = adminAPI.useLazyGetAllCountriesQuery();
  const [getCities] = adminAPI.useLazyGetAllCitiesQuery();

  useEffect(() => {
    Promise.all([getAddressesTypes(''), getCountries(''), getCities('')]).then(([addressesTypes, countries, cities]) => {
      setData(addressesDataDto([
        { values: addressesTypes.data, type: 'Address' },
        { values: countries.data, type: 'Country' },
        { values: cities.data, type: 'City' },
      ]));
    });
  }, [getAddressesTypes, getCountries, getCities]);

  console.log(data); // ------------------------

  return (
    <main className={styles.content}>
      <ul className={styles.content__list}>
        {data && data.map((obj: any) => (
          <li key={obj.id}>
            <Directory directory={obj} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default withAuthLayout(DirectoryPage);
