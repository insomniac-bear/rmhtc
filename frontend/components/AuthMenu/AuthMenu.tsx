import Link from 'next/link';
import { FC } from 'react';
import { IAuthMenuProps } from './AuthMenu.props';
import styles from './AuthMenu.module.css';
import { Button } from '../Button/Button';

export const AuthMenu: FC<IAuthMenuProps> = ({ className = '', ...props }) => (
  <ul className={`${styles.authMenu} ${className}`} {...props}>
    <li>
      <Link href="/?modal=signup" as="/signup" passHref>
        <a>
          <Button appearance="primary" type="button">Sign Up</Button>
        </a>
      </Link>
    </li>
    <li>
      <Link href="/?modal=login" as="/login" passHref>
        <a>
          <Button appearance="ghost" type="button">Log In</Button>
        </a>
      </Link>
    </li>
  </ul>
);
