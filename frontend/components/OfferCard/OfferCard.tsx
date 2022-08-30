import { FC } from 'react';
import styles from './OfferCard.module.css';
import { IOfferCard } from './OfferCard.props';

export const OfferCard: FC<IOfferCard> = ({ className = '', ...props }) => (
  <div className={`${styles.offer} ${className}`} {...props}>
    <div className={styles.offer__header}>
      <div className={styles.offer__slider}>
        <p>images</p>
      </div>
      <h1 className={styles.offer__title}>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
      <p className={styles.offer__price}>$ 506-987/ piece</p>
      <p className={styles.offer__seller}>
        <span>Seller</span>
        RogaInvestHolding
      </p>
    </div>
    <div className={styles.offer__description}>
      <img src="#" alt="#" />
      <img src="#" alt="#" />
      <img src="#" alt="#" />
      <img src="#" alt="#" />
      <img src="#" alt="#" />
      <img src="#" alt="#" />
    </div>
    <div className={styles.offer__characteristic}>
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
  </div>
);
