import { FC } from 'react';
import styles from './CompanyCard.module.css';
import { ICompanyCard, ICompanyData } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { company } from './companyData';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';
import { headerDataDto, basicInfoDataDto, legalInfoDataDto } from './constants';

export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const companyData: ICompanyData = company;
  const headerData = headerDataDto(companyData);
  return (
    <section className={`${styles.company} ${className}`} {...props}>
      <CardHeader data={headerData} />
      <CompanyCharacteristics title="Basic information" data={companyData} dto={basicInfoDataDto} />
      <CompanyCharacteristics title="Legal information" data={companyData} dto={legalInfoDataDto} />
      <div className={styles.company__controls}>
        <Button type="button" appearance="primary">Approve</Button>
        <Button type="button" appearance="ghost">Reject</Button>
      </div>
    </section>
  );
};
