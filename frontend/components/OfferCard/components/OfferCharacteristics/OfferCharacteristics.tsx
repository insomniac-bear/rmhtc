import { FC } from 'react';
import styles from './OfferCharacteristics.module.css';
import { IOfferCharacteristics } from './OfferCharacteristics.props';

export const OfferCharacteristics: FC<IOfferCharacteristics> = ({ className = '', ...props }) => (
  <div className={`${styles.offer__characteristic} ${className}`} {...props}>
    <ul className={styles.offer__characteristicList}>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Category</p>
        <p className={styles.offer__characteristicValue}>Office goods</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Vendor code</p>
        <p className={styles.offer__characteristicValue}>547357349489</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>High</p>
        <p className={styles.offer__characteristicValue}>25.00 centimeters</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Width</p>
        <p className={styles.offer__characteristicValue}>12.00 centimeters</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Depth</p>
        <p className={styles.offer__characteristicValue}>2  centimeters</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Cover</p>
        <p className={styles.offer__characteristicValue}>Cardboard with soft-touch lamination</p>
      </li>
      <li className={styles.offer__characteristicListItem}>
        <p className={styles.offer__characteristicName}>Number of pages</p>
        <p className={styles.offer__characteristicValue}>60</p>
      </li>
    </ul>
  </div>
);
