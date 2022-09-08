import { FC } from 'react';
import Link from 'next/link';
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
        <span className={styles.offer__type}>{offerType}</span>
      </Title>
      <p className={styles.offer__price}>{price}</p>
      <div className={styles.offer__additionalInfoWrapper}>
        <p className={styles.offer__additional}>
          <span className={styles.offer__caption}>Category</span>
          {categories.join(', ')}
        </p>
        <p className={styles.offer__seller}>
          <span className={styles.offer__caption}>Seller</span>
          <Link href="#" passHref>
            <a className={styles.offer__link}>
              {company}
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};
