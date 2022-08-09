import { FC } from 'react';
import Link from 'next/link';
import styles from './CompanyCard.module.css';
import { ICompanyData } from './types';
import { ICompanyCard } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { company } from './mokData';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';
import {
  headerDataDto, basicInfoDataDto, legalInfoDataDto, contactsIfoDataDto,
} from './dataDto/dataDto';
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
        <Link href="/admin/moderation/company/1/?modal=approved">
          <a>
            <Button className={styles.company__button} onClick={handleApprove} type="button" appearance="primary">Approve</Button>
          </a>
        </Link>
        <Link href="/admin/moderation/company/1/?modal=reject">
          <a>
            <Button className={styles.company__button} onClick={handleReject} type="button" appearance="ghost">Reject</Button>
          </a>
        </Link>
      </div>
    </section>
  );
};
