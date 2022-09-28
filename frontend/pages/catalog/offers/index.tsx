/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import styles from '../CatalogPage.module.css';
import { Header } from '../../../components/Header/Header';
import { SimpleSearch } from '../../../components/SimpleSearch/SimpleSearch';
import { Footer } from '../../../components/Footer/Footer';
import { Button } from '../../../components/Button/Button';
import { OffersCatalog } from '../../../components/OffersCatalog/OffersCatalog';
import { CatalogNav } from '../../../components/CatalogNav/CatalogNav';
import { SearchFilter } from '../../../components/SearchFilter/SearchFilter';
import { PriceFilter } from '../../../components/PriceFilter/PriceFilter';

type FormData = {
  category?: string;
  currency?: string;
  minPrice?: string;
  maxPrice?: string;
};

const CatalogOffersPage: NextPage = () => {
  const { handleSubmit, register } = useForm<FormData>();

  const submitFormHandler = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>ITC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header middle="navMenu" />
      <main className={styles.content}>
        <div className={styles.content__navContainer}>
          <SimpleSearch />
          <CatalogNav />
        </div>
        <OffersCatalog />
        <form className={styles.content__filtersSideBar} onSubmit={handleSubmit(submitFormHandler)}>
          <SearchFilter label="Category" fieldName="category" {...register('category')} placeholder="Enter category" />
          <PriceFilter register={register} />
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

export default CatalogOffersPage;
