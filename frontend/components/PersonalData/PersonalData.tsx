import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { clearUser, setUser } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Title } from '../Title/Title';
import styles from './PersonalData.module.css';
import { IPersonalDataProps } from './PersonalData.props';

export const PersonalData: FC<IPersonalDataProps> = ({ className }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const { register, handleSubmit } = useForm();

  const [logOut] = userAPI.useLogOutMutation();
  const [updateAvatar] = userAPI.useUpdateAvatarMutation();

  const handleSetAvatar = async (data: any) => {
    try {
      const newUserData: any = await updateAvatar(data.avatar[0]);
      dispatch(setUser(newUserData.data.user));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut('');
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      Cookies.remove('accessToken');
      dispatch(clearUser());
      router.push('/');
    }
  };
  return (
    <div className={`${styles.personalData} ${className}`}>
      <Container className={styles.personalData__container}>
        <form onChange={handleSubmit(handleSetAvatar)} className={styles.personalData__avatar}>
          <input
            id="avatar"
            className={styles.personalData__avatarInput}
            type="file"
            {...register('avatar')}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="avatar" className={styles.personalData__avatarLabel}>
            <div className={styles.personalData__avatarImg}>
              <Image layout="fill" src={user.avatarUrl || '/profile-icon.svg'} />
            </div>
            <p className={styles.personalData__avatarCaption}>Add photo</p>
          </label>
        </form>
        <div className={styles.personalData__info}>
          <div className={styles.personalData__fullName}>
            <Title className={styles.personalData__fullNameTitle} tag="h2" size="s">{`${user.name || 'Input'} ${user.surname || 'Name'}`}</Title>
            <Link href="personal-data/?modal=edit_name" as="/profile/personal-data/edit-name" passHref>
              <a><div className={styles.personalData__editIcon} /></a>
            </Link>
          </div>
          <ul className={styles.personalData__contactInfo}>
            <li className={styles.personalData__contactItem}>
              <div className={styles.personalData__contacts}>
                <p className={styles.personalData__contactCaption}>Email</p>
                <p className={styles.personalData__contact}>{user.email || 'Email'}</p>
              </div>
              <Link href="personal-data/?modal=edit_email" as="/profile/personal-data/edit-email" passHref>
                <a><div className={styles.personalData__editIcon} /></a>
              </Link>
            </li>
            <li className={styles.personalData__contactItem}>
              <div className={styles.personalData__contacts}>
                <p className={styles.personalData__contactCaption}>Business role</p>
                <p className={styles.personalData__contact}>{user.businessRole || 'Input role'}</p>
              </div>
              <Link href="personal-data/?modal=edit_role" as="/profile/personal-data/edit-role" passHref>
                <a><div className={styles.personalData__editIcon} /></a>
              </Link>
            </li>
          </ul>
          <div className={styles.personalData__controls}>
            <Button onClick={handleLogOut} className={styles.personalData__logOutButton} type="button">Log Out</Button>
            <Button className={styles.personalData__deleteAccountButton} type="button">Delete account</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
