import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Title } from '../Title/Title';
import styles from './CatalogOfferPreview.module.css';
import { ICatalogOfferPreview } from './CatalogOfferPreview.props';
import previewPlaceholder from './offerPreview.png';
import flag from './SingaporeFlag.png';

export const CatalogOfferPreview: FC<ICatalogOfferPreview> = ({ className = '', ...props }) => (
  <div className={`${styles.card} ${className}`} {...props}>
    <Image className={styles.card__img} src={previewPlaceholder} alt="Placeholder" />
    <Title size="s" tag="h2">Название товара/услугиииииииииииииии</Title>
    <p className={styles.card__price}>From 5 865 $</p>
    <p className={styles.card__description}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi fuga molestias sequi velit pariatur nisi.
    </p>
    <Link href="#" passHref>
      <a className={styles.company__link}>
        RogaInvestHolding
        <Image className={styles.company__linkIcon} src={flag} alt="Flag" />
      </a>
    </Link>
  </div>
);
