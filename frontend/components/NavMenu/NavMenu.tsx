import { FC } from 'react';
import { INavMenuProps } from './NavMenu.props';
import styles from './NavMenu.module.css';
import { navMenuMockData } from './navMenuMockData';
import { NavLink } from '../NavLink/NavLink';

export const NavMenu: FC<INavMenuProps> = ({ className = '', ...props }) => (
  <nav>
    <ul className={`${styles.navMenu} ${className}`} {...props}>
      {navMenuMockData.map((navMenuItem) => (
        <li key={navMenuItem.id}>
          <NavLink href={navMenuItem.link} exact activeClass={styles.navMenu__link_active} className={styles.navMenu__link}>
            {navMenuItem.titleEN}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
