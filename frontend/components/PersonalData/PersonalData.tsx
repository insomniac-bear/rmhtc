import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { clearUser } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { AvatarChangeForm } from '../AvatarChangeForm/AvatarChangeForm';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Title } from '../Title/Title';
import styles from './PersonalData.module.css';
import { IPersonalDataProps } from './PersonalData.props';

export const PersonalData: FC<IPersonalDataProps> = ({ className }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);

  const [logOut] = userAPI.useLogOutMutation();

  const handleLogOut = async () => {
    try {
      await logOut('');
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      Cookies.remove('accessToken');
      await dispatch(clearUser());
      router.push('/');
    }
  };
  return (
    <div className={`${styles.personalData} ${className}`}>
      <Container className={styles.personalData__container}>
        <AvatarChangeForm />
        <div className={styles.personalData__info}>
          <div className={styles.personalData__fullName}>
            <Title className={styles.personalData__fullNameTitle} tag="h2" size="s">{`${user.name || 'Input'} ${user.surname || 'Name'}`}</Title>
            <Link href="/profile/personal-data?modal=edit_name" passHref>
              <a><div className={styles.personalData__editIcon} /></a>
            </Link>
          </div>
          <ul className={styles.personalData__contactInfo}>
            <li className={styles.personalData__contactItem}>
              <div className={styles.personalData__contacts}>
                <p className={styles.personalData__contactCaption}>Email</p>
                <p className={styles.personalData__contact}>{user.email || 'Email'}</p>
              </div>
              <Link href="/profile/personal-data?modal=edit_email" passHref>
                <a><div className={styles.personalData__editIcon} /></a>
              </Link>
            </li>
            <li className={styles.personalData__contactItem}>
              <div className={styles.personalData__contacts}>
                <p className={styles.personalData__contactCaption}>Business role</p>
                <p className={styles.personalData__contact}>{user.businessRole || 'Input role'}</p>
              </div>
              <Link href="/profile/personal-data?modal=edit_role" passHref>
                <a><div className={styles.personalData__editIcon} /></a>
              </Link>
            </li>
          </ul>
          <div className={styles.personalData__controls}>
            <Button onClick={handleLogOut} className={styles.personalData__logOutButton} type="button">Log Out</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
