/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';
import { directoryDataDto } from '../../../../utils/directoryDataDto';

const CompanyDirectoryPage: NextPage = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [getBusinessTypes] = adminAPI.useLazyGetCompaniesBusinessTypesQuery();
  const [getLegalForms] = adminAPI.useLazyGetCompaniesLegalFormsQuery();

  useEffect(() => {
    Promise.all([getBusinessTypes(''), getLegalForms('')]).then(([businessTypes, legalForms]) => {
      setData(directoryDataDto([
        { values: businessTypes.data, fetchParams: { type: 'type', route: 'business-type' }, label: 'Business' },
        { values: legalForms.data, fetchParams: { type: 'type', route: 'legal-form' }, label: 'Legal form' },
      ]));
    })
      .then(() => setIsLoading(false))
      .catch((err) => {
        throw new Error(err);
      });
  }, [getBusinessTypes, getLegalForms]);

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

export default withAuthLayout(CompanyDirectoryPage);
