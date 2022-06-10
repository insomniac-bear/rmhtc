import Link from 'next/link';
import { FC } from 'react';
import { INavMenuProps } from './NavMenu.props';
import styles from './NavMenu.module.css';
import { navMenuMockData } from './navMenuMockData';

export const NavMenu: FC<INavMenuProps> = ({ className, ...props }) => (
  <nav>
    <ul className={`${styles.navMenu} ${className}`} {...props}>
      {navMenuMockData.map((navMenuItem) => (
        <li key={navMenuItem.id}>
          <Link href={navMenuItem.link} passHref>
            <a className={styles.navMenu__link}>{navMenuItem.titleEN}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
