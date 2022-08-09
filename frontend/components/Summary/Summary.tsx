import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { Container } from '../Container/Container';
import { ModerationStatusList } from '../ModerationStatusList/ModerationStatusList';
import { Title } from '../Title/Title';
import styles from './Summary.module.css';
import { ISummaryProps } from './Summary.props';

export const Summary: FC<ISummaryProps> = ({ className = '', ...props }) => {
  const userCompaniesCounts = useAppSelector((store) => store.user.user.counts);

  return (
    <div className={`${styles.summary} ${className}`} {...props}>
      <Container isBackgroundLogo className={`${styles.summary__objects}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_xl}`}>
            {userCompaniesCounts && userCompaniesCounts.companyCount}
          </span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_xl}`} tag="h2" size="l">
            objects
          </Title>
        </div>
      </Container>
      <Container className={`${styles.summary__companies}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>
            {userCompaniesCounts && userCompaniesCounts.companyCount}
          </span>
          <Title className={`${styles.summary__title} ${styles.summary__title_size_l}`} tag="h2" size="l">
            companies
          </Title>
        </div>
        <ModerationStatusList
          className={styles.summary__moderationStatusList}
          active={userCompaniesCounts && userCompaniesCounts.moderatedCompanyCount}
          inProgress={userCompaniesCounts && userCompaniesCounts.idleModerateCompanyCount}
          declined={userCompaniesCounts && userCompaniesCounts.failedCompanyCount}
        />
      </Container>
      <Container className={`${styles.summary__requests}`}>
        <div className={styles.summary__containerTitle}>
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>0</span>
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
          <span className={`${styles.summary__counter} ${styles.summary__counter_size_l}`}>0</span>
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
