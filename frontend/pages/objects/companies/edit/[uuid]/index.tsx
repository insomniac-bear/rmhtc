import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

  const [getUserCompanies] = userAPI.useGetUserCompaniesMutation();

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response: any = await getUserCompanies('');
        dispatch(setCompanies(response.data.companies));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
  }, [dispatch, getUserCompanies]);

  return (
    <NewCompanyForm
      className={styles.newCompanyPage__form}
      company={currentCompany}
    />
  );
};

export default withAuthLayout(EditCompanyPage);
