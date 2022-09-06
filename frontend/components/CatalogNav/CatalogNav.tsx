import { FC } from 'react';
import { NavLink } from '../NavLink/NavLink';
import styles from './CatalogNav.module.css';
import { ICatalogNav } from './CatalogNav.props';

export const CatalogNav: FC<ICatalogNav> = ({ className = '', ...props }) => (
  <nav className={`${styles.nav} ${className}`} {...props}>
    <ul className={styles.nav__list}>
      <li>
        <NavLink href="/catalog/companies" className={styles.nav__link} activeClass={styles.nav__link_active}>
          Companies
        </NavLink>
      </li>
      <li>
        <NavLink href="/catalog/offers" className={styles.nav__link} activeClass={styles.nav__link_active}>
          Offers
        </NavLink>
      </li>
      <li>
        <NavLink href="/catalog/requests" className={styles.nav__link} activeClass={styles.nav__link_active}>
          Requests
        </NavLink>
      </li>
    </ul>
  </nav>
);
