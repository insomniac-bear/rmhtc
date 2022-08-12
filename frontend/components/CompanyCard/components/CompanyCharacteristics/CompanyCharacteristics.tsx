import { FC } from 'react';
import Link from 'next/link';
import { Container } from '../../../Container/Container';
import { Title } from '../../../Title/Title';
import styles from './CompanyCharacteristics.module.css';
import { ICompanyCharacteristics } from './CompanyCharacteristics.props';

function hrefFilter<TValue>(value: TValue | null | undefined | number): value is TValue {
  return value !== null && value !== undefined && typeof value !== 'number';
}

const linkRegex = /document|Document|Link/;
export const CompanyCharacteristics: FC<ICompanyCharacteristics> = ({
  title, data, dto,
}) => {
  const dataProperties = dto(data);
  const dataKeys: string[] = Object.keys(dataProperties);
  const transformedKeys: { [key: string]: string } = {
    issuingAuthority: 'Registration authority',
    website: 'Link',
    ceo: 'Head of company’s name',
    businessType: 'Company type',
    ceoDocUrl: 'Document confirming the authority of  the head of company',
    legalForm: 'Legal form',
    qcEmployees: 'Total number of employees',
    budgetOfYear: 'Annual turner',
    yearOfFoundation: 'Year of foundation of the company',
    regDocUrl: 'Registration document',
    [data?.regNumName || '']: `${data?.regNumName}`, // Не уверен что это хорошее решение
  };

  return (
    <Container className={styles.card}>
      <Title tag="h2" size="s" className={styles.card__title}>{title}</Title>
      <ul className={styles.card__list}>
        {dataKeys.map((el) => (
          <li className={styles.card__item} key={el}>
            <p className={styles.card__name}>{transformedKeys[el]}</p>
            { linkRegex.test(transformedKeys[el]) ? (
              <Link
                rel="noreferrer"
                target="_blank"
                href={hrefFilter(dataProperties[el]) ? dataProperties[el]?.toString()! : ''}
              >
                <a className={styles.card__link}>
                  {transformedKeys[el] === 'Link' ? dataProperties[el] : 'Document link'}
                </a>
              </Link>
            ) : (
              <p className={styles.card__value}>{dataProperties[el]}</p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};
