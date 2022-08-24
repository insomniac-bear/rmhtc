/* eslint-disable jsx-a11y/control-has-associated-label */
import { NextPage } from 'next';
import styles from './DirectoryPage.module.css';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import { Directory } from '../../../components/Directory/Directory';

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

const DirectoryPage: NextPage = () => (
  <main className={styles.content}>
    <ul className={styles.content__list}>
      {addresses.map((el: any) => (
        <li key={el.uuid}>
          <Directory obj={el} />
        </li>
      ))}
    </ul>
  </main>
);

export default withAuthLayout(DirectoryPage);
