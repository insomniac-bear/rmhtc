import { FC } from 'react';
import styles from './CardHeader.module.css';
import { ICompanyHeader } from './CardHeader.props';
import { Title } from '../../../Title/Title';
import { Container } from '../../../Container/Container';
import { CompanyLogo } from '../../../CompanyLogo/CompanyLogo';

export const CardHeader: FC<ICompanyHeader> = ({ data }) => (
  <Container className={styles.cardHeader}>
    <CompanyLogo
      className={styles.cardHeader__logo}
      url={data?.logoUrl}
      alt={data?.name}
      size={70}
    />
    <div className={styles.cardHeader__nameWrapper}>
      <Title tag="h1" size="m" className={styles.cardHeader__name}>{data.name}</Title>
      {data.geo && <div className={styles.cardHeader__geo}><p className={styles.cardHeader__geoText}>{data.geo}</p></div>}
    </div>
    <p className={styles.cardHeader__description}>{data.description}</p>
  </Container>
);
