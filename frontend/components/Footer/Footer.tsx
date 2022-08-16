import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Logo } from '../Logo/Logo';
import { IFooter } from './Footer.props';
import { Title } from '../Title/Title';
import { NavMenu } from '../NavMenu/NavMenu';
import vk from '../../images/icons/social/social-vk.svg';
import telegram from '../../images/icons/social/social-telegram.svg';
import youtube from '../../images/icons/social/social-youtube.svg';

export const Footer: FC<IFooter> = ({ className = '', ...props }) => (
  <footer className={`${styles.footer} ${className}`} {...props}>
    <div className={styles.footer__signup}>
      <Title className={styles.footer__signupTitle} tag="h2" size="m">On the other hand, we  withOn the other hand, we  with</Title>
      <p className={styles.footer__description}>
        On the other hand, we denounce with right other hand, we denounce with rigth other hand, we denounce with righteous theOn the other hand,
        we denounce with righteous the
      </p>
      <button className={styles.footer__signupButton} type="button"> Sign Up</button>
    </div>
    <div className={styles.footer__mainContainer}>
      <Logo className={styles.footer__logo} />
      <NavMenu className={styles.footer__nav} />
      {/* Надо добавить вложенные ссылки */}
      <ul className={styles.footer__social}>
        <li>
          <Link href="https://vk.com/" passHref>
            <a target="_blank" rel="noreferrer"><Image src={vk} alt="VK" /></a>
          </Link>
        </li>
        <li>
          <Link href="https://web.telegram.org/" passHref>
            <a target="_blank" rel="noreferrer"><Image src={telegram} alt="Telegram" /></a>
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/">
            <a target="_blank" rel="noreferrer"><Image src={youtube} alt="YouTube" /></a>
          </Link>
        </li>
      </ul>
      <div className={styles.footer__copyrightWrapper}>
        <span className={styles.footer__copyright}>Copyright © 2022 International Technology Center. All rights reserved.</span>
        <span className={styles.footer__developed}>Developed by ADD</span>
      </div>
    </div>
  </footer>
);
