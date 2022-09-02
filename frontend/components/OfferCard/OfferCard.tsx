import { FC, useState } from 'react';
import styles from './OfferCard.module.css';
import { IOfferCard } from './OfferCard.props';
import { Button } from '../Button/Button';
import { OfferHeader } from './components/OfferHeader/OfferHeader';
import { OfferCharacteristics } from './components/OfferCharacteristics/OfferCharacteristics';
import { OfferDescription } from './components/OfferDescription/OfferDescription';
import { OfferRejectMessage } from './components/OfferRejectMessage/OfferRejectMessage';

export const OfferCard: FC<IOfferCard> = ({ className = '', ...props }) => {
  const [content, setContent] = useState<'description' | 'characteristic'>('description');

  return (
    <div className={`${styles.offer} ${className}`} {...props}>
      <OfferRejectMessage />
      <OfferHeader />
      <div className={styles.offer__container}>
        <div className={styles.offer__contentControls}>
          <button
            type="button"
            onClick={() => setContent('description')}
            className={content === 'description'
              ? `${styles.offer__showContentBtn} ${styles.offer__showContentBtn_active}`
              : `${styles.offer__showContentBtn}`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setContent('characteristic')}
            className={content === 'characteristic'
              ? `${styles.offer__showContentBtn} ${styles.offer__showContentBtn_active}`
              : `${styles.offer__showContentBtn}`}
          >
            Characteristic
          </button>
        </div>
        {content === 'characteristic' && <OfferCharacteristics />}
        {content === 'description' && <OfferDescription />}
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
