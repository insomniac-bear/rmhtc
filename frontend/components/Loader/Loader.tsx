/* eslint-disable max-len */
import { FC } from 'react';
import styles from './Loader.module.css';
import { ILoaderProps } from './Loader.props';

export const Loader: FC<ILoaderProps> = ({ className = '', style, ...props }) => (
  <div style={style} className={`${styles.loader} ${className}`} {...props}>
    <div className={styles.loader__circle1} />
    <div className={styles.loader__circle2} />
    <div className={styles.loader__circle3} />
  </div>
);
