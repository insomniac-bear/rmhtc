import { FC } from 'react';
import Image from 'next/image';
import { ILogoProps } from './Logo.props';
import styles from './Logo.module.css';

export const Logo: FC<ILogoProps> = ({
  className = '', size = 70, ...props
}) => (
  <div
    style={{
      width: size,
      height: size,
    }}
    className={`${styles.logo} ${className}`}
    {...props}
  >
    <Image
      src="/images/logo.svg"
      layout="fill"
      alt="ITC Logo"
    />
  </div>
);
