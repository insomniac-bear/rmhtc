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
    <div className={`${styles.header} ${className}`} {...props}>
      <OfferSlider arr={photos} outerСlassName={styles.header__slider} />
      <Title tag="h1" size="s" className={styles.header__title}>
        {name}
        <span className={styles.header__offerType}>{offerType}</span>
      </Title>
      <p className={styles.header__price}>{price}</p>
      <div className={styles.header__additionalInfoWrapper}>
        {categories && (
        <p className={styles.header__additional}>
          <span className={styles.header__caption}>Category</span>
          {categories.join(', ')}
        </p>
        )}
        {company && (
          <p className={styles.header__seller}>
            <span className={styles.header__caption}>Seller</span>
            <Link href="#" passHref>
              <a className={styles.header__link}>
                {company.name}
              </a>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
