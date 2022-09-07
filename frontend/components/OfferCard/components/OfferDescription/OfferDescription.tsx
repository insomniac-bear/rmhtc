import { FC } from 'react';
import styles from './OfferDescription.module.css';
import { IOfferCardDescription } from './OfferDescription.porps';

export const OfferDescription: FC<IOfferCardDescription> = ({
  data, dto, className = '', ...props
}) => {
  const { description, presentationUrl } = dto(data);

  return (
    <div className={`${styles.description} ${className}`} {...props}>
      <p className={styles.description__text}>{description}</p>
      <a href={presentationUrl} className={styles.description__link}>Presentation link</a>
    </div>
  );
};
