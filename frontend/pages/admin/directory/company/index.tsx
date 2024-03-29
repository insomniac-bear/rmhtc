/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { apiService } from '../../../../services/apiService';
import { Loader } from '../../../../components/Loader/Loader';

const CompanyDirectoryPage: NextPage = () => {
  const [businessTypesDirectory, setBusinessTypesDirectory] = useState<null | any>(null);
  const [legalFormsDirectory, setLegalFormsDirectory] = useState<null | any>(null);

  const { data: businessTypesRes, isLoading: isBusinessTypesLoading } = apiService.useGetBusinessTypesQuery('');
  const { data: legalFormsRes, isLoading: isLegalFormsLoading } = apiService.useGetLegalFormsQuery('');

  useEffect(() => {
    setBusinessTypesDirectory({ values: businessTypesRes, fetchParams: { endpoint: 'type', route: 'business-type' } });
    setLegalFormsDirectory({ values: legalFormsRes, fetchParams: { endpoint: 'type', route: 'legal-form' } });
  }, [businessTypesRes, legalFormsRes]);

  return (
    <div className={styles.container}>
      {isBusinessTypesLoading && isLegalFormsLoading && <Loader />}
      {!isBusinessTypesLoading && !isLegalFormsLoading && (
        <ul className={styles.list}>
          <li>
            {businessTypesDirectory?.values && (
              <Directory directory={businessTypesDirectory} label="Bussines" />
            )}
          </li>
          <li>
            {legalFormsDirectory?.values && (
              <Directory directory={legalFormsDirectory} label="Legal form" />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default withAuthLayout(CompanyDirectoryPage);
