import { FC } from 'react';
import Image from 'next/image';
import { ILogoProps } from './Logo.props';
import styles from './Logo.module.css';
import logo from '../../public/logo.svg';

export const Logo: FC<ILogoProps> = ({
  className = '', size = 70, src = logo, alt = 'RMHTC Logo', ...props
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
      src={src}
      layout="fill"
      alt={alt}
    />
  </div>
);
