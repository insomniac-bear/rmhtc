import { FC } from 'react';
import styles from './CompanyCharacteristics.module.css';
import { ICompanyCharacteristics } from './CompanyCharacteristics.props';

export const CompanyCharacteristics: FC<ICompanyCharacteristics> = ({
  title, data, dto, className = '', ...props
}) => {
  const dataProperties = dto(data);
  const dataKeys = Object.keys(dataProperties);
  const transformedKeys: {[key: string]: string} = {
    issuingAuthority: 'Registration authority',
    website: 'Link',
    ceo: 'Head of company’s name',
    bussinesType: 'Company type',
    ceoDocUrl: 'Document confirming the authority of  the head of company',
    legalForm: 'Legal form',
    qcEmployees: 'Total number of employees',
    budgetOfYear: 'Annual turner',
    yearOfFoundation: 'Year of foundation of the company',
    regDocUrl: 'Registration document',
    [data?.regNumName]: `${data?.regNumName}`,
    // Actual: 'Actual address',
    // Legal: 'Legal address',
    // Mailing: 'Mailing address',
    // Fax: 'Fax',
    // Mobilephone: 'Mobile phone',
    // Email: 'Email',
    // Facebook: 'Facebook',
    // LinkedIn: 'LinkedIn',
    // Telegram: 'Telegram',
    // WhatsApp: 'WhatsApp',
    // Workphone: 'Workphone',
  };
  // const reg = /http/; // https @  t.me
  // if(transformedKeys[el] === 'Email || Telegram || Facebook') {

  // }

  return (
    <div className={`${styles.card} ${className}`} {...props}>
      <h2 className={styles.card__title}>{title}</h2>
      <ul className={styles.card__list}>
        {dataKeys.map((el) => (
          <li className={styles.card__item}>
            <p className={styles.card__fieldName}>{transformedKeys[el]}</p>
            <p className={styles.card__fieldValue}>{dataProperties[el]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
