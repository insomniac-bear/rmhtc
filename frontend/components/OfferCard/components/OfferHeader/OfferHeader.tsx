import { FC } from 'react';
import Image from 'next/image';
import styles from './OfferHeader.module.css';
import cardImage from '../../image.png';
import { IOfferHeader } from './OfferHeader.props';

export const OfferHeader: FC<IOfferHeader> = ({ className = '', ...props }) => (
  <div className={`${styles.offer__header} ${className}`} {...props}>
    <div className={styles.offer__slider}>
      <ul className={styles.offer__sliderTrack}>
        <li className={styles.offer__sliderItem}><Image src={cardImage} alt="1" /></li>
        <li className={styles.offer__sliderItem}><Image src={cardImage} alt="2" /></li>
        <li className={styles.offer__sliderItem}><Image src={cardImage} alt="3" /></li>
        <li className={styles.offer__sliderItem}><Image src={cardImage} alt="4" /></li>
      </ul>
      <ul className={styles.offer__sliderPag}>
        <li><span className={styles.offer__sliderPagItem} /></li>
      </ul>
    </div>
    <h1 className={styles.offer__title}>Lorem ipsum dolor sit amet, consectetur adipisicing. lore</h1>
    <p className={styles.offer__price}>$ 506-987/ piece</p>
    <p className={styles.offer__seller}>
      <span className={styles.offer__sellerCaption}>Seller</span>
      RogaInvestHolding
    </p>
  </div>
);
