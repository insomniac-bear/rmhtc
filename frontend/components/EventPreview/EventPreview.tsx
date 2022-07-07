import { FC } from 'react';
import { Title } from '../Title/Title';
import styles from './EventPreview.module.css';
import { IEventPreviewProps } from './EventPreview.props';

export const EventPreview: FC<IEventPreviewProps> = ({
  isNew, title, date, address, className = '', ...props
}) => (
  <div
    className={`
      ${styles.eventPreview}
      ${isNew && styles.eventPreview_new}
      ${className}
    `}
    {...props}
  >
    <p className={styles.eventPreview__date}>{date}</p>
    <Title className={styles.eventPreview__title} tag="h3" size="s">{title}</Title>
    <p className={styles.eventPreview__address}>{`${address.country}, ${address.city}`}</p>
    <i className={styles.eventPreview__scaleIcon} />
  </div>
);
