import { FC } from 'react';
import styles from './CompanyCard.module.css';
import { ICompanyCard } from './CompanyCard.props';

export const CompanyCard: FC<ICompanyCard> = ({ card }): React.ReactElement => {
  let color = { backgroundColor: `${card.type}` };
  switch (card.type) {
    case 'Offer':
      color = { backgroundColor: '#9B51E0' };
      break;
    case 'Requests':
      color = { backgroundColor: '#2D9CDB' };
      break;
    case 'News':
      color = { backgroundColor: '#F2994A' };
      break;
    case 'Company':
      color = { backgroundColor: '#27AE60' };
      break;
    default: {
      color = { backgroundColor: 'inherit' };
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardIdentifier} style={color} />
      <p className={styles.cardСharacter}>
        <span className={styles.cardСharacterType}>Name</span>
        {card.name}
      </p>
      <p className={styles.cardСharacter}>
        <span className={styles.cardСharacterType}>Type</span>
        {card.type}
      </p>
      <p className={styles.cardСharacter}>
        <span className={styles.cardСharacterType}>Date</span>
        {card.createDate}
      </p>
      <div className={card.toggled ? `${styles.cardLockIcon}` : `${styles.cardUnlockIcon}`} />
    </div>
  );
};
