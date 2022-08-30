import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ProfileSideMenu } from '../../components/ProfileSideMenu/ProfileSideMenu';
import { Header } from '../../components/Header/Header';
import styles from './AuthLayout.module.css';
import { IAuthLayoutProps } from './AuthLayout.props';
import { userAPI } from '../../services/userService';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setUser, setUserAuth } from '../../services/slices/users';

export const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  const [checkAuth] = userAPI.useCheckAuthMutation();
  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function checkToken() {
      try {
        const response: any = await checkAuth('');
        if (response.data.accessToken) {
          dispatch(setUserAuth(true));
          dispatch(setUser(response.data.userData));
          Cookies.set('accessToken', response.data.accessToken);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }
    checkToken();

    if (user.role === 'USER' && router.pathname.includes('admin')) router.push('/profile/summary');
    // eslint-disable-next-line max-len
    if (user.role === 'ADMINISTRATOR' && (router.pathname.includes('profile') || router.pathname.includes('objects'))) router.push('/admin/moderation');
  }, [checkAuth]);

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
