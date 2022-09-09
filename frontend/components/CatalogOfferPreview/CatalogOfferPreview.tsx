import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Title } from '../Title/Title';
import styles from './CatalogOfferPreview.module.css';
import previewPlaceholder from './offerPreview.png';
// import flag from './SingaporeFlag.png';

export const CatalogOfferPreview = forwardRef(({ className = '', ...props }:any, ref: any) => (
  <div className={`${styles.card} ${className}`} {...props} ref={ref}>
    <div className={styles.card__image}>
      <Image
        src={previewPlaceholder}
        alt="Placeholder"
        layout="fill"
      />
    </div>
    <div className={styles.card__textContent}>
      <Title className={styles.card__title} size="s" tag="h2">Название товара/услугиииииииииииииии</Title>
      <p className={styles.card__price}>From 5 865 $</p>
      <p className={styles.card__description}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi fuga molestias sequi velit pariatur nisi.
      </p>
      {/* Ссылка внутренняя или на внешний сайт компании? */}
      <Link href="#" passHref>
        <a className={styles.card__link}>
          RogaInvestHolding
        </a>
      </Link>
      {/* Пока не понятно, будет ли флаг и откуда его возьмем */}
      {/* <Image
        className={styles.card__flagIcon}
        src={flag}
        alt="Flag"
        layout="fixed"
        width={20}
        height={20}
      /> */}
    </div>
  </div>
));
