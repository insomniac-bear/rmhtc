import { nanoid } from '@reduxjs/toolkit';
import { FC } from 'react';
import styles from './OfferCharacteristics.module.css';
import { IOfferCharacteristics } from './OfferCharacteristics.props';

export const OfferCharacteristics: FC<IOfferCharacteristics> = ({ data, className = '', ...props }) => (
  <div className={`${styles.offer__characteristic} ${className}`} {...props}>
    <ul className={styles.offer__characteristicList}>
      {data.map((item: any) => (
        <li key={nanoid()} className={styles.offer__characteristicListItem}>
          <p className={styles.offer__characteristicName}>{item.name[0].toUpperCase() + item.name.slice(1)}</p>
          <p className={styles.offer__characteristicValue}>{item.value}</p>
        </li>
      ))}
    </ul>
  </div>
);
