import { FC, useState } from 'react';
import styles from './OfferCard.module.css';
import { IOfferCard } from './OfferCard.props';
import { Button } from '../Button/Button';
import { OfferHeader } from './components/OfferHeader/OfferHeader';
import { OfferCharacteristics } from './components/OfferCharacteristics/OfferCharacteristics';

export const OfferCard: FC<IOfferCard> = ({ className = '', ...props }) => {
  const [content, setContent] = useState<'description' | 'characteristic'>('description');

  return (
    <div className={`${styles.offer} ${className}`} {...props}>
      <OfferHeader />
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
          <OfferCharacteristics />
        )}
        {content === 'description' && (
          <div className={styles.offer__description}>
            <p className={styles.offere}>sdsd</p>
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
