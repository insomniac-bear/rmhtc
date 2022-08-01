import { FC } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './CompanyCard.module.css';
import { ICompanyCard } from './CompanyCard.props';
import logo from './logoPlaceholder.png';

export const CompanyCard: FC<ICompanyCard> = () => (
  <section className={styles.company}>
    <article className={styles.company__mainInfo}>
      <Logo className={styles.company__logo} src={logo} alt="Logo" />
      <div className={styles.company__nameWrapper}>
        <h1 className={styles.company__name}>Roga Invest Holding</h1>
        <div className={styles.company__geo}><p className={styles.company__geoText}>Russia, Moscow</p></div>
      </div>
      <p className={styles.company__description}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo
      </p>
    </article>
    <div className={styles.info}>
      <h2 className={styles.info__title}>Basic</h2>
      <ul className={styles.info__list}>
        <li className={styles.info__item}>
          <p className={styles.info__field}>Legal form</p>
          <p className={styles.info__value}>Partnership</p>
        </li>
        <li className={styles.info__item}>
          <p className={styles.info__field}>Document confirming the authority of  the head of company</p>
          <a className={styles.info__value}>Company document No 647443</a>
        </li>
      </ul>
    </div>
  </section>
);
