import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loader } from '../../../../../components/Loader/Loader';
import { NewCompanyForm } from '../../../../../components/NewCompanyForm/NewCompanyForm';
import { withAuthLayout } from '../../../../../layouts/AuthLayout/AuthLayout';
import { useAppSelector, useAppDispatch } from '../../../../../services/hooks';
import { setCompanies } from '../../../../../services/slices/users';
import { userAPI } from '../../../../../services/userService';

import styles from './EditCompanyPage.module.css';

const EditCompanyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUUID = router.query.uuid;

  const companies = useAppSelector((store) => store.user.userCompanies);
  const currentCompany: any = companies.find((company) => company.uuid === currentUUID);

  const { data: userCompaniesQueryData, isLoading, refetch } = userAPI.useGetUserCompaniesQuery('');

  useEffect(() => {
    refetch();
    if (userCompaniesQueryData) dispatch(setCompanies(userCompaniesQueryData.companies));
  }, [dispatch, userCompaniesQueryData]);

  return (
    <div>
      {isLoading || !currentCompany
        ? <Loader style={{ margin: '120px auto' }} />
        : <NewCompanyForm className={styles.newCompanyPage__form} company={currentCompany} />}
    </div>
  );
};

export default withAuthLayout(EditCompanyPage);
