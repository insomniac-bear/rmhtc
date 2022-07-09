import { FC } from 'react';
import { IHeadlineProps } from './Headline.props';
import styles from './Headline.module.css';
import { Title } from '../Title/Title';

export const Headline: FC<IHeadlineProps> = ({ className = '', ...props }) => (
  <section className={`${styles.headline} ${className}`} {...props}>
    <div className={styles.headline__background}>
      <div className={styles.headline__backPhoto} />
      <div className={styles.headline__backGraphic} />
    </div>
    <div className={styles.headline__titleContent}>
      <Title className={styles.headline__title} tag="h1" size="l">Russian Malasian High Tech Center</Title>
      <Title className={styles.headline__subtitle} tag="h2" size="s">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
      </Title>
    </div>
  </section>
);
