import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Error from 'next/error';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import styles from './ProfileMenu.module.css';
import { IProfileMenuProps } from './ProfileMenu.props';
import { Button } from '../Button/Button';
import { LangList } from '../LangList/LangList';
import { userAPI } from '../../services/userService';
import { clearUser } from '../../services/slices/users';

export const ProfileMenu: FC<IProfileMenuProps> = ({ menuData, className = '', ...props }) => {
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
      router.push('/');
      dispatch(clearUser());
      Cookies.remove('accessToken');
    }
  };

  return (
    <div className={`${styles.profileMenu} ${className}`} {...props}>
      <div className={user.role === 'ADMINISTRATOR' ? `${styles.profileMenu__admin}` : `${styles.profileMenu__user}`}>
        <div className={styles.profileMenu__userImg}>
          <Image priority alt="profile icon" src={user.avatarUrl || '/profile-icon.svg'} layout="fill" />
        </div>
        <p className={styles.profileMenu__userName}>{`${user.name || ''} ${user.surname || ''}`}</p>
        {user.role === 'ADMINISTRATOR' && <span className={styles.profileMenu__userRole}>Administrator</span>}
      </div>
      <ul className={styles.profileMenu__navLinks}>
        {menuData.map((el:any) => (
          <li>
            <Link href={el.link} passHref><a className={styles.profileMenu__link}>{el.title}</a></Link>
          </li>
        ))}
        {/* <li>
          <Link href="/profile/summary" passHref><a className={styles.profileMenu__link}>Profile</a></Link>
        </li>
        <li>
          <Link href="/objects/requests" passHref><a className={styles.profileMenu__link}>Requests</a></Link>
        </li>
        <li>
          <Link href="/objects/offers" passHref><a className={styles.profileMenu__link}>Offers</a></Link>
        </li> */}
      </ul>
      <div className={styles.profileMenu__controls}>
        <Button onClick={handleLogOut} className={styles.profileMenu__logOutButton} type="button">Log Out</Button>
        <LangList className={styles.profileMenu__langList} />
      </div>
    </div>
  );
};
