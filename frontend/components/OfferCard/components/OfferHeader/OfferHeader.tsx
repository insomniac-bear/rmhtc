import { FC } from 'react';
import styles from './OfferHeader.module.css';
import { IOfferHeader } from './OfferHeader.props';
import { OfferSlider } from '../OfferSlider/OfferSlider';
import { Title } from '../../../Title/Title';

export const OfferHeader: FC<IOfferHeader> = ({
  data, dto, className = '', ...props
}) => {
  const {
    photos, name, price, offerType, categories, company,
  } = dto(data);

  return (
    <div className={`${styles.offer__header} ${className}`} {...props}>
      <OfferSlider arr={photos} outerСlassName={styles.offer__slider} />
      <Title tag="h1" size="s" className={styles.offer__title}>
        {name}
        <span className={styles.offer__caption}>{offerType}</span>
      </Title>
      <p className={styles.offer__price}>{price}</p>
      <div className={styles.offer__additionalInfo}>
        <p className={styles.offer__seller}>
          <span className={styles.offer__caption}>Category</span>
          {categories.join(', ')}
        </p>
        <p className={styles.offer__seller}>
          <span className={styles.offer__caption}>Seller</span>
          {company}
        </p>
      </div>
    </div>
  );
};
