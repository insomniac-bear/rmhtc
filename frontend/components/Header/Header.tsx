import Link from 'next/link';
import { FC } from 'react';
import { IHeaderProps } from './Header.props';
import styles from './Header.module.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
// import { LangList } from '../LangList/LangList';
import { AuthMenu } from '../AuthMenu/AuthMenu';
import { useAppSelector } from '../../services/hooks';
import { Title } from '../Title/Title';
import { SearchBar } from '../SearchBar/SearchBar';

export const Header: FC<IHeaderProps> = ({
  className, middle = 'navMenu', logoSize, ...props
}) => {
  const isAuth = useAppSelector((store) => store.user.isAuth);

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
      {!isAuth ? <AuthMenu className={styles.header__authMenu} /> : <Title tag="h3" size="s">AUTH</Title>}
    </header>
  );
};
