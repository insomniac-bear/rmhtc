import { FC } from 'react';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCard } from '../CompanyCard/CompanyCard';

export const ModerationCardList: FC<IModerationCardList> = () => (
  <ul className={styles.cardList}>
    {cardData.map((item: any) => (
      <li key={item.id}>
        <CompanyCard card={item} />
      </li>
    ))}
  </ul>
);
