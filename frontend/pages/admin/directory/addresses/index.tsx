/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './AddressesDirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';

const directoryDataDto = (dataArr: any) => dataArr.map((el: any) => ({ id: nanoid(), values: el.values, type: el.type }));

const AddressesDirectoryPage: NextPage = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [getCountries] = adminAPI.useLazyGetAllCountriesQuery();
  const [getCities] = adminAPI.useLazyGetAllCitiesQuery();
  const [getAddressesTypes] = adminAPI.useLazyGetAddressesTypesQuery();

  useEffect(() => {
    Promise.all([getCities(''), getCountries(''), getAddressesTypes('')]).then(([countries, cities, addressesTypes]) => {
      setData(directoryDataDto([
        { values: countries.data, type: 'Country' },
        { values: cities.data, type: 'City' },
        { values: addressesTypes.data, type: 'Address' },
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
