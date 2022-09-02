import { FC } from 'react';
// import Image from 'next/image';
import styles from './OfferHeader.module.css';
import cardImage1 from '../../image.png';
import cardImage2 from '../../image2.jpg';
import cardImage3 from '../../image3.jpg';
import cardImage4 from '../../image4.jpg';
import cardImage5 from '../../image5.jpg';
import { IOfferHeader } from './OfferHeader.props';
import { OfferSlider } from '../OfferSlider/OfferSlider';
import { Title } from '../../../Title/Title';

const images = [
  { img: cardImage1, id: 1 },
  { img: cardImage2, id: 2 },
  { img: cardImage3, id: 3 },
  { img: cardImage4, id: 4 },
  { img: cardImage5, id: 5 },
];

export const OfferHeader: FC<IOfferHeader> = ({ className = '', ...props }) => (
  <div className={`${styles.offer__header} ${className}`} {...props}>
    <OfferSlider arr={images} outerСlassName={styles.offer__slider} />
    <Title tag="h1" size="s" className={styles.offer__title}>Lorem ipsum dolor sit amet, consectetur adipisicing. lore</Title>
    <p className={styles.offer__price}>$ 506-987/ piece</p>
    <p className={styles.offer__seller}>
      <span className={styles.offer__sellerCaption}>Seller</span>
      RogaInvestHolding
    </p>
  </div>
);
