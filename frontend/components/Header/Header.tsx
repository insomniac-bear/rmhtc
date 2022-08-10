/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { IHeaderProps } from './Header.props';
import styles from './Header.module.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
// import { LangList } from '../LangList/LangList';
import { AuthMenu } from '../AuthMenu/AuthMenu';
import { useAppSelector } from '../../services/hooks';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button } from '../Button/Button';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { menuData } from '../../mockData/userMenuData';
import { adminMenuData } from '../../mockData/adminMenuData';

export const Header: FC<IHeaderProps> = ({
  className = '', middle = 'navMenu', logoSize, ...props
}) => {
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const user = useAppSelector((store) => store.user.user);
  const profileMenuData = user.role === 'USER' ? menuData : adminMenuData;

  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <Link href="/" passHref>
        <a>
          <Logo size={logoSize} />
        </a>
      </Link>
      {middle === 'navMenu' && <NavMenu className={styles.header__navMenu} />}
      {middle === 'searchBar' && <SearchBar />}
      {/* {!isAuth && <LangList />} */}
      {!isAuth ? <AuthMenu className={styles.header__authMenu} /> : (
        <div className={styles.header__profile}>
          <Button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={styles.header__profileButton}
            type="button"
          >
            <Image layout="fill" alt="profile icon" src={user.avatarUrl || '/profile-icon.svg'} />
          </Button>

          {showProfileMenu && <ProfileMenu menuData={profileMenuData} className={styles.header__profileMenu} />}
        </div>
      )}
    </header>
  );
};
