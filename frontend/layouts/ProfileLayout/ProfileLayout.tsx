/* eslint-disable arrow-body-style */
import { FC } from 'react';
import { ProfileSideMenu } from '../../components/ProfileSideMenu/ProfileSideMenu';
import { Header } from '../../components/Header/Header';
import styles from './ProfileLayout.module.css';
import { IProfileLayoutProps } from './ProfileLayout.props';

export const ProfileLayout: FC<IProfileLayoutProps> = ({ children }) => {
  return (
    <div className={styles.profileLayout__wrapper}>
      <Header logoSize={50} middle="searchBar" className={styles.profileLayout__header} />
      <ProfileSideMenu className={styles.profileLayout__sidebar} />
      <div className={styles.profileLayout__body}>{children}</div>
    </div>
  );
};

export const withProfileLayout = <T extends Record<string, unknown>>(Component: FC<T>) => function withLayoutComponent(props: T): JSX.Element {
  return (
    <ProfileLayout>
      <Component {...props} />
    </ProfileLayout>
  );
};
