import { FC } from 'react';
import styles from './CompanyCard.module.css';
import { ICompanyCard } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { company } from './companyData';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';

const headerDataDto = (data) => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  addresses: data?.addresses,
});
const basicInfoDataDto = (data) => ({
  website: data?.website,
  ceo: data?.ceo,
  bussinesType: data?.bussinesType,
  ceoDocUrl: data?.ceoDocUrl,
});
const legalInfoDataDto = (data) => ({
  legalForm: data?.legalForm,
  qcEmployees: data?.qcEmployees,
  budgetOfYear: data?.budgetOfYear,
  yearOfFoundation: data?.yearOfFoundation,
  regDocUrl: data?.regDocUrl,
  issuingAuthority: data?.issuingAuthority,
  [data?.regNumName]: data?.regNumber,
});
const addressDto = (data) => ({
  addressType: data?.addressType,
  address: {
    postCode: data?.postCode,
    country: data?.country,
    city: data?.city,
    street: data?.street,
    buildNum: data?.buildNum,
    roomNum: data?.roomNum,
  },
});
export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const companyData = company;
  const addresses = company?.addresses.map((el) => addressDto(el));
  const headerData = headerDataDto(companyData);
console.log(headerData);

  return (
    <section className={`${styles.company} ${className}`} {...props}>
      <CardHeader data={headerData} />
      <CompanyCharacteristics title="Basic information" data={companyData} dto={basicInfoDataDto} />
      <CompanyCharacteristics title="Legal information" data={companyData} dto={legalInfoDataDto} />
      {/* <CompanyCharacteristics title="Legal information" data={companyData} dto={legalInfoDataDto} /> */}
      <div className={styles.company__controls}>
        <Button type="button" appearance="primary">Approve</Button>
        <Button type="button" appearance="ghost">Reject</Button>
      </div>
    </section>
  );
};
