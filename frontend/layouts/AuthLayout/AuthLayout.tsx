/* eslint-disable arrow-body-style */
import { FC, useEffect } from 'react';
import { ProfileSideMenu } from '../../components/ProfileSideMenu/ProfileSideMenu';
import { Header } from '../../components/Header/Header';
import styles from './AuthLayout.module.css';
import { IAuthLayoutProps } from './AuthLayout.props';
import { userAPI } from '../../services/userService';
import { useAppDispatch } from '../../services/hooks';
import { setUser, setUserAuth } from '../../services/slices/users';

export const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  const [checkAuth] = userAPI.useCheckAuthMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function checkToken() {
      try {
        const response: any = await checkAuth('');
        dispatch(setUserAuth(true));
        dispatch(setUser(response.data.user));
      } catch (error: any) {
        throw new Error(error);
      }
    }
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.authLayout__wrapper}>
      <Header logoSize={50} middle="searchBar" className={styles.authLayout__header} />
      <ProfileSideMenu className={styles.authLayout__sidebar} />
      <div className={styles.authLayout__body}>{children}</div>
    </div>
  );
};

export const withAuthLayout = <T extends Record<string, unknown>>(Component: FC<T>) => function withLayoutComponent(props: T): JSX.Element {
  return (
    <AuthLayout>
      <Component {...props} />
    </AuthLayout>
  );
};
