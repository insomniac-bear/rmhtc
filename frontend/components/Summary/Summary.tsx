/* eslint-disable arrow-body-style */
import { Container } from '../Container/Container';
import { ModerationStatusList } from '../ModerationStatusList/ModerationStatusList';
import { Title } from '../Title/Title';
import styles from './Summary.module.css';

export const Summary = () => {
  return (
    <div className={styles.summary}>
      <Container isBackgroundLogo className={`${styles.summary__objects}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_xl}`}>40</span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_xl}`} tag="h2" size="l">
            objects
          </Title>
        </div>
      </Container>
      <Container className={`${styles.summary__companies}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>20</span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_l}`} tag="h2" size="l">
            companies
          </Title>
        </div>
        <ModerationStatusList
          className={styles.summary__moderationStatusList}
          active={0}
          inProgress={0}
          declined={0}
        />
      </Container>
      <Container className={`${styles.summary__requests}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>10</span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_l}`} tag="h2" size="l">
            requests
          </Title>
        </div>
        <ModerationStatusList
          className={styles.summary__moderationStatusList}
          active={0}
          inProgress={0}
          declined={0}
        />
      </Container>
      <Container className={`${styles.summary__offers}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>10</span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_l}`} tag="h2" size="l">
            offers
          </Title>
        </div>
        <ModerationStatusList
          className={styles.summary__moderationStatusList}
          active={0}
          inProgress={0}
          declined={0}
        />
      </Container>
      <Container className={`${styles.summary__news}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>0</span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_l}`} tag="h2" size="l">
            news
          </Title>
        </div>
        <ModerationStatusList
          className={styles.summary__moderationStatusList}
          active={0}
          inProgress={0}
          declined={0}
        />
      </Container>
    </div>
  );
};
