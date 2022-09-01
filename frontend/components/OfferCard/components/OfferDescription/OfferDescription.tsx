import { FC } from 'react';
import styles from './OfferDescription.module.css';
import { IOfferCardDescription } from './OfferDescription.porps';

export const OfferDescription: FC<IOfferCardDescription> = ({ className = '', ...props }) => (
  <div className={`${styles.description} ${className}`} {...props}>
    <p className={styles.description__text}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae modi quo blanditiis porro!
      Blanditiis praesentium reiciendis consectetur distinctio voluptatem iure molestiae quia, labore
      rerum iste nam tenetur voluptas, eaque vel dignissimos veniam voluptatibus id aperiam alias tempora
      molestias pariatur aspernatur soluta? Ducimus animi sunt inventore sapiente. At corporis
      possimus omnis!
    </p>
    <a href="#" className={styles.description__link}>Presentation link</a>
  </div>
);
