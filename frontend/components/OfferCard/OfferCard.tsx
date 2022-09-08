import { FC, useState } from 'react';
import styles from './OfferCard.module.css';
import { IOfferCard } from './OfferCard.props';
import { Button } from '../Button/Button';
import { OfferHeader } from './components/OfferHeader/OfferHeader';
import { OfferCharacteristics } from './components/OfferCharacteristics/OfferCharacteristics';
import { OfferDescription } from './components/OfferDescription/OfferDescription';
import { OfferRejectMessage } from './components/OfferRejectMessage/OfferRejectMessage';
import { offer } from './offerMockData';
import { offerDescriptionDataDto, offerHeaderDataDto } from '../../utils/offerDataDto/offerCardDataDto';

export const OfferCard: FC<IOfferCard> = ({ access, className = '', ...props }) => {
  const [content, setContent] = useState<'description' | 'characteristic'>('description');

  return (
    <div className={`${styles.offer} ${className}`} {...props}>
      {offer.moderated === 'failed' && <OfferRejectMessage message={offer.moderatedReason} />}
      <OfferHeader data={offer} dto={offerHeaderDataDto} />
      {/* Если в объекте отсутсвуют характеристики или описание с презентацией?
        1. Рендерить оба блока или только то что пришло?
        2. Если 1, то кнопки не нужны? Отобразить название блока вместо левой кнопки?  */}
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
        {content === 'characteristic' && <OfferCharacteristics data={offer.characteristics} />}
        {content === 'description' && <OfferDescription data={offer} dto={offerDescriptionDataDto} />}
      </div>
      {access === 'admin' && (
        <div className={styles.offer__moderationControls}>
          <Button className={styles.offer__moderationBtn} type="button" appearance="primary">
            Approve
          </Button>
          <Button className={styles.offer__moderationBtn} type="button" appearance="ghost">
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};
