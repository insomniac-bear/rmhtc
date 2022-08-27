import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Link from 'next/link';
import styles from './CatalogPage.module.css';
import { Header } from '../../../components/Header/Header';
import { SimpleSearch } from '../../../components/SimpleSearch/SimpleSearch';
import { CheckboxFilter } from '../../../components/CheckboxFilter/CheckboxFilter';
import { Footer } from '../../../components/Footer/Footer';
import { CompaniesCatalog } from '../../../components/CompaniesCatalog/CompaniesCatalog';
import {
  companyType, legalForm, annualTurner, employees, country,
} from './catalogMockData';
import { Button } from '../../../components/Button/Button';
import { userAPI } from '../../../services/userService';
import { Loader } from '../../../components/Loader/Loader';
import { ICompanyData } from '../../../types';

type FormData = {
  annualTurner?: string[];
  companyType?: string[];
  country?: string[];
  employees?: string[];
  legalForm?: string[];
};

const CatalogPage: NextPage = () => {
  const [companiesData, setCompaniesData] = useState<any | null>(null);
  const [getCompanies, { isLoading: isCompaniesLoading }] = userAPI.useLazyGetAllCompaniesQuery();
  const { handleSubmit, register } = useForm<FormData>();

  const submitFormHandler = (data: FormData) => {
    console.log(data);
  };

  const handleGetMore = () => {
    if (companiesData && companiesData.count > 9) {
      getCompanies(companiesData.page + 1)
        .then((res) => setCompaniesData((prevState) => ({
          ...prevState,
          companies: prevState?.companies.concat(res.data.companies),
          page: prevState.page + 1,
        })));
    }
  };

  useEffect(() => {
    getCompanies('')
      .then((res) => setCompaniesData({...res.data, page: 1 }))
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <title>RMHTC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header middle="navMenu" />
      <main className={styles.content}>
        <div className={styles.content__searchBar}>
          <SimpleSearch />
          <nav>
            <ul className={styles.content__nav}>
              <li>
                <Link href="/catalog/companies">
                  <a className={`${styles.nav__link} ${styles.nav__link_active}`}>Companies</a>
                </Link>
              </li>
              <li>
                <Link href="/catalog/companies">
                  <a className={styles.nav__link}>Offers</a>
                </Link>
              </li>
              <li>
                <Link href="/catalog/companies">
                  <a className={styles.nav__link}>Requests</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isCompaniesLoading && <Loader />}
        {!isCompaniesLoading && companiesData && <CompaniesCatalog data={companiesData} onGetMore={handleGetMore} />}
        <form className={styles.content__filtersBar} onSubmit={handleSubmit(submitFormHandler)}>
          <CheckboxFilter filters={companyType} label="Company type" register={register} fieldName="companyType" />
          <CheckboxFilter filters={legalForm} label="Legal form" register={register} fieldName="legalForm" />
          <CheckboxFilter filters={annualTurner} label="Annual Turner" register={register} fieldName="annualTurner" />
          <CheckboxFilter filters={employees} label="Total number of employees" register={register} fieldName="employees" />
          <CheckboxFilter filters={country} label="Country" register={register} fieldName="country" />
          <div className={styles.content__filtersControls}>
            <Button className={styles.content__filtersButton} type="reset">Reset</Button>
            <Button className={styles.content__filtersButton} appearance="primary" type="submit">Apply</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
