/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from './DirectoryPage.module.css';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

type FormData = {
  searchParams: string;
};

const DirectoryPage: NextPage = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const submitFormHandler = (data: FormData) => {
    data.searchParams.toLowerCase();
  };

  return (
    <div>
      <div className={styles.controls}>
        <form
          onSubmit={handleSubmit(submitFormHandler)}
          className={styles.search}
        >
          <input
            className={styles.search__input}
            type="text"
            placeholder="Search"
            {...register('searchParams')}
          />
          <button type="submit" className={styles.search__button} />
        </form>
        <nav>
          <ul className={styles.controls__nav}>
            <li>
              <Link href="/admin/moderation/addresses">
                <a className={`${styles.nav__link} ${styles.controls__link_active}`}>Addresses</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/moderation/company">
                <a className={styles.controls__link}>Company</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/moderation/offers">
                <a className={styles.controls__link}>Offers</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/moderation/contacts">
                <a className={styles.controls__link}>Contacts and social networks</a>
              </Link>
            </li>
            <li>
              <button className={styles.controls__addBtn} type="button">+ New directory</button>
            </li>
          </ul>
        </nav>
      </div>
      <main className={styles.content}>
        <h1>123</h1>
      </main>
    </div>
  );
};

export default withAuthLayout(DirectoryPage);
