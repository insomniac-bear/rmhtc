import { FC } from 'react';
import styles from './CompanyCard.module.css';
import { ICompanyCard, ICompanyData } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { company } from './companyData';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';
import {
  headerDataDto, basicInfoDataDto, legalInfoDataDto, contactsIfoDataDto,
} from './constants';
import { CompanyContactsList } from './components/CompanyContactsList/CompanyContactsList';

export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const companyData: ICompanyData = company;
  const headerData = headerDataDto(companyData);
  const contactsData = contactsIfoDataDto(companyData);
  const handleApprove = () => {
    console.log('Approved!');
  };
  const handleReject = () => {
    console.log('Rejected!');
  };
  return (
    <section className={`${styles.company} ${className}`} {...props}>
      <CardHeader data={headerData} />
      <CompanyCharacteristics title="Basic information" data={companyData} dto={basicInfoDataDto} />
      <CompanyContactsList title="Contact information" data={contactsData} />
      <CompanyCharacteristics title="Legal information" data={companyData} dto={legalInfoDataDto} />
      <div className={styles.company__controls}>
        <Button className={styles.company__button} onClick={handleApprove} type="button" appearance="primary">Approve</Button>
        <Button className={styles.company__button} onClick={handleReject} type="button" appearance="ghost">Reject</Button>
      </div>
    </section>
  );
};
