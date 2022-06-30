/* eslint-disable arrow-body-style */
import { FC } from 'react';
import styles from './ModerationStatusList.module.css';
import { IModerationStatusListProps } from './ModerationStatusList.props';

export const ModerationStatusList: FC<IModerationStatusListProps> = ({
  className = '', active = 0, inProgress = 0, declined = 0,
}) => {
  return (
    <ul className={`${styles.moderationStatusList} ${className}`}>
      <li className={styles.moderationStatusList__item}>
        <p className={styles.moderationStatusList__caption}>Active</p>
        <span className={styles.moderationStatusList__counter}>{active}</span>
      </li>
      <li className={styles.moderationStatusList__item}>
        <p className={styles.moderationStatusList__caption}>In moderation process</p>
        <span className={styles.moderationStatusList__counter}>{inProgress}</span>
      </li>
      <li className={styles.moderationStatusList__item}>
        <p className={styles.moderationStatusList__caption}>Didn’t pass moderation</p>
        <span className={styles.moderationStatusList__counter}>{declined}</span>
      </li>
    </ul>
  );
};
