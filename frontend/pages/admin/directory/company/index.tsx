/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import styles from '../DirectoryPage.module.css';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../../components/Directory/Directory';
import { adminAPI } from '../../../../services/adminService';
import { Loader } from '../../../../components/Loader/Loader';

const CompanyDirectoryPage: NextPage = () => {
  const [businessTypesDirectory, setBusinessTypesDirectory] = useState<null | any>(null);
  const [legalFormsDirectory, setLegalFormsDirectory] = useState<null | any>(null);

  const { data: businessTypesRes, isLoading: isBusinessTypesLoading } = adminAPI.useGetCompaniesBusinessTypesQuery('');
  const { data: legalFormsRes, isLoading: isLegalFormsLoading } = adminAPI.useGetCompaniesLegalFormsQuery('');

  useEffect(() => {
    setBusinessTypesDirectory({ values: businessTypesRes, fetchParams: { type: 'type', route: 'business-type', label: 'type' }, uuid: nanoid() });

    setLegalFormsDirectory({ values: legalFormsRes, fetchParams: { type: 'type', route: 'legal-form', label: 'type' }, uuid: nanoid() });
  }, [businessTypesRes, legalFormsRes]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          {isBusinessTypesLoading && <Loader />}
          {!isBusinessTypesLoading && businessTypesDirectory?.values && (
            <Directory directory={businessTypesDirectory} setDirectory={setBusinessTypesDirectory} label="Bussines" />
          )}
        </li>
        <li>
          {isLegalFormsLoading && <Loader />}
          {!isLegalFormsLoading && legalFormsDirectory?.values && (
            <Directory directory={legalFormsDirectory} setDirectory={setLegalFormsDirectory} label="Legal form" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default withAuthLayout(CompanyDirectoryPage);
