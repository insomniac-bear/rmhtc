import Link from 'next/link';
import { FC } from 'react';
import { IHeaderProps } from './Header.props';
import styles from './Header.module.css';
import { NavMenu } from '../NavMenu/NavMenu';
import { Logo } from '../Logo/Logo';
import { LangList } from '../LangList/LangList';
import { AuthMenu } from '../AuthMenu/AuthMenu';

export const Header: FC<IHeaderProps> = ({ className, ...props }) => (
  <header className={`${styles.header} ${className}`} {...props}>
    <Link href="/" passHref>
      <a>
        <Logo />
      </a>
    </Link>
    <NavMenu className={styles.header__navMenu} />
    <LangList />
    <AuthMenu className={styles.header__authMenu} />
  </header>
);
