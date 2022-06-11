import { Title } from '../Title/Title';
import styles from './EventPreview.module.css';

export const EventPreview = ({
  isNew, title, date, address,
}: any) => (
  <div className={`
      ${styles.eventPreview}
      ${isNew && styles.eventPreview_new}
    `}
  >
    <p className={styles.eventPreview__date}>{date}</p>
    <Title className={styles.eventPreview__title} tag="h3" size="s">{title}</Title>
    <p className={styles.eventPreview__address}>{`${address.country}, ${address.city}`}</p>
    <i className={styles.eventPreview__scaleIcon} />
  </div>
);
