import { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './ModerationMessage.module.css';
import { Button } from '../Button/Button';
import { IModerationMessage } from './ModerationMessage.props';

export const ModerationMessage: FC<IModerationMessage> = ({ message, className = '', ...props }) => {
  const router = useRouter();
  return (
    <div className={`${styles.moderationMessage} ${className}`} {...props}>
      <p className={styles.moderationMessage__message}>{message}</p>
      <Button
        className={styles.moderationMessage__button}
        onClick={() => router.push('/admin/moderation')}
        type="button"
        appearance="primary"
      >
        Ok
      </Button>
    </div>
  );
};
