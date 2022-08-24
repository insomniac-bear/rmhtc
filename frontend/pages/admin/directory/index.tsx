/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from './DirectoryPage.module.css';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

type FormData = {
  searchParams: string;
};

const addresses = [
  {
    type: 'Country',
    uuid: 'abc',
    values: [{ uuid: 1, value: 'russia', label: 'Russia' }, { uuid: 2, value: 'unitedKingdom', label: 'United Kingdom' }],
  },
  {
    type: 'City',
    uuid: 'abcd',
    values: [{ uuid: 11, value: 'moscow', label: 'Moscow' }, { uuid: 22, value: 'omsk', label: 'Omsk' }],
  },
  {
    type: 'Address type',
    uuid: 'abcdef',
    values: [
      { uuid: 111, value: 'legal', label: 'Legal address' },
      { uuid: 222, value: 'post', label: 'Post address' },
      { uuid: 333, value: 'actual', label: 'Actual address' },
    ],
  },
];

const DirectoryPage: NextPage = () => {
  const { handleSubmit, register } = useForm<FormData>();
  const submitFormHandler = (data: FormData) => {
    data.searchParams.toLowerCase();
  };

  return (
    <div>
      {/* <div className={styles.controls}>
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
                <a className={`${styles.controls__link} ${styles.controls__link_active}`}>Addresses</a>
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
      </div> */}
      <main className={styles.content}>
        <ul className={styles.content__list}>
          {addresses.map((el: any) => (
            <li key={el.uuid}>
              <div className={styles.directory}>
                <p className={styles.directory__columnName}>{el.type}</p>
                <p className={styles.directory__columnName}>Actions</p>
                <ul className={styles.directory__list}>
                  {el.values.map((item: any) => (
                    <li key={item.uuid}>
                      <p className={styles.directory__item}>{item.value}</p>
                      <div className={styles.directory__itemControls}>
                        <button type="button" className={styles.directory__controlButton}>r</button>
                        <button type="button" className={styles.directory__controlButton}>wr</button>
                      </div>
                    </li>
                  ))}
                  <li>
                    <form action="submit" className={styles.directory__newItem}>
                      <input
                        type="text"
                        className={styles.directory__addField}
                        placeholder={`+ New ${el.type.toLowerCase()}`}
                      />
                      <button type="submit" className={styles.directory__addBtn}>Add</button>
                    </form>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default withAuthLayout(DirectoryPage);
