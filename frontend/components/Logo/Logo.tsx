import { FC } from 'react';
import Image from 'next/image';
import { ILogoProps } from './Logo.props';
import styles from './Logo.module.css';
import logo from '../../public/logo.svg';

export const Logo: FC<ILogoProps> = ({ className, size = 70, ...props }) => (
  <div
    style={{
      width: size,
      height: size,
    }}
    className={styles.logo}
    {...props}
  >
    <Image
      src={logo}
      layout="fill"
      alt="RMHTC Logo"
    />
  </div>
);
