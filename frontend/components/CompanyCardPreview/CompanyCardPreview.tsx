import { FC, ReactElement } from 'react';
import styles from './CompanyCardPreview.module.css';
import { ICompanyCardPreview } from './CompanyCardPreview.props';

export const CompanyCardPreview: FC<ICompanyCardPreview> = ({
  type, card, className = '', ...props
}): ReactElement => (
  <div className={`${styles.card} ${className}`} {...props}>
    <div className={`${styles.card_identifier} ${styles[`card_identifier_color_${type}`]}`} />
    <p className={styles.card_character}>
      <span className={styles.card_characterType}>Name</span>
      {card.name}
    </p>
    <p className={styles.card_character}>
      <span className={styles.card_characterType}>Type</span>
      {type}
    </p>
    <p className={styles.card_character}>
      <span className={styles.card_characterType}>Date</span>
      {card.createdAt.split('T')[0]}
    </p>
    <div className={card.toggled ? `${styles.card_lockIcon}` : `${styles.card_unlockIcon}`} />
  </div>
);
