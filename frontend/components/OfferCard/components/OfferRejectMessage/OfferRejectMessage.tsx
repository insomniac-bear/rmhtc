import { FC } from 'react';
import styles from './OfferRejectMessage.module.css';
import { Button } from '../../../Button/Button';
import { IOfferRejectMessage } from './OfferRejectMessage.props';

export const OfferRejectMessage: FC<IOfferRejectMessage> = ({ className = '', ...props }) => (
  <div className={`${styles.message} ${className}`} {...props}>
    <p className={styles.message__description}>The offer did not pass moderation.</p>
    <p className={styles.message__messageText}>Reson: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <Button className={styles.message__btn} type="button" appearance="primary">Edit data</Button>
  </div>
);
