import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './OfferCard.module.css';
import { IOfferCard } from './OfferCard.props';
import cardImage from './image.png';
import descriptionImage from './descriptionPlaceholder.png';
import { Button } from '../Button/Button';

const paginationSlider = [1, 2, 3, 4, 5];

export const OfferCard: FC<IOfferCard> = ({ className = '', ...props }) => {
  const [content, setContent] = useState<'description' | 'characteristic'>('description');
  // const toggleContainer = (value: 'description' | 'characteristic') => setContent(value);

  return (
    <div className={`${styles.offer} ${className}`} {...props}>
      <div className={styles.offer__header}>
        <div className={styles.offer__slider}>
          <ul className={styles.offer__sliderTrack}>
            <li className={styles.offer__sliderItem}><Image src={cardImage} alt="1" /></li>
            <li className={styles.offer__sliderItem}><Image src={cardImage} alt="2" /></li>
            <li className={styles.offer__sliderItem}><Image src={cardImage} alt="3" /></li>
            <li className={styles.offer__sliderItem}><Image src={cardImage} alt="4" /></li>
          </ul>
          <ul className={styles.offer__sliderPag}>
            {paginationSlider.map((el) => (
              <li key={el}><span className={styles.offer__sliderPagItem} /></li>
            ))}
          </ul>
        </div>
        <h1 className={styles.offer__title}>Lorem ipsum dolor sit amet, consectetur adipisicing. lore</h1>
        <p className={styles.offer__price}>$ 506-987/ piece</p>
        <p className={styles.offer__seller}>
          <span className={styles.offer__sellerCaption}>Seller</span>
          RogaInvestHolding
        </p>
      </div>
      <div className={styles.offer__contentControls}>
        <button
          type="button"
          onClick={() => setContent('description')}
          className={`${styles.offer__showContentBtn} ${styles.offer__showContentBtn_active}`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setContent('characteristic')}
          className={styles.offer__showContentBtn}
        >
          Characteristic
        </button>
      </div>
      <div className={styles.offer__container}>
        {content === 'characteristic' && (
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
        )}
        {content === 'description' && (
          <div className={styles.offer__description}>
            <Image src={descriptionImage} alt="description" />
          </div>
        )}
      </div>
      <div className={styles.offer__moderationControls}>
        <Button className={styles.offer__moderationBtn} type="button" appearance="primary">
          Approve
        </Button>
        <Button className={styles.offer__moderationBtn} type="button" appearance="ghost">
          Reject
        </Button>
      </div>
    </div>
  );
};
