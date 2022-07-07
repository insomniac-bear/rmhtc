/* eslint-disable arrow-body-style */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC } from 'react';
import { Title } from '../Title/Title';
import { IProfileSideMenu } from './ProfileSideMenu.props';
import styles from './ProfileSideMenu.module.css';
import { menuData } from './menuData';

export const ProfileSideMenu: FC<IProfileSideMenu> = ({ className = '', ...props }) => {
  const router = useRouter();

  return (
    <div className={`${styles.profileSideMenu} ${className}`} {...props}>
      <Title className={styles.profileSideMenu__title} tag="h2" size="s">Personal office</Title>
      <nav className={styles.profileSideMenu__nav}>
        <ul className={styles.profileSideMenu__menuList}>
          {menuData.map((menuItem) => (
            <li className={styles.profileSideMenu__menuItem} key={menuItem.id}>
              {menuItem.innerLinks.length ? (
                <>
                  <input
                    defaultChecked={router.pathname.includes(menuItem.title.toLowerCase())}
                    className={styles.profileSideMenu__innerMenuCheckbox}
                    id={menuItem.id}
                    type="checkbox"
                  />
                  <label
                    className={`
                      ${styles.profileSideMenu__menuTitle}
                      ${styles.profileSideMenu__menuTitle_arrowState}
                      ${router.pathname.includes(menuItem.title.toLowerCase()) ? styles.profileSideMenu__menuTitle_active : ''}
                    `}
                    htmlFor={menuItem.id}
                  >
                    <span>{menuItem.title}</span>
                  </label>

                  <div className={styles.profileSideMenu__innerMenu}>
                    {menuItem.innerLinks.map((innerLink) => {
                      return (
                        <div key={innerLink.id}>
                          <Link href={`/profile${innerLink.link}`} passHref>
                            <a className={`
                              ${styles.profileSideMenu__innerLink}
                              ${router.pathname === `/profile${innerLink.link}` ? styles.profileSideMenu__innerLink_active : ''}
                            `}
                            >
                              {innerLink.title}
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link href={`/profile${menuItem.link}` || ''} passHref>
                  <a className={`
                    ${styles.profileSideMenu__menuTitle}
                    ${router.pathname === `/profile${menuItem.link}` ? styles.profileSideMenu__menuTitle_active : ''}
                    `}
                  >
                    {menuItem.title}
                  </a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
