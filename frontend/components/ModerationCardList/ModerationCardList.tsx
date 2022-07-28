import { FC } from 'react';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCardPreview } from '../CompanyCardPreview/CompanyCardPreview';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => (
  <ul className={`${styles.cardList} ${className}`} {...props}>
    {cardData.map((item) => (
      <li key={item.id}>
        <CompanyCardPreview card={item} />
      </li>
    ))}
  </ul>
);
