import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './CompanyCard.module.css';
import { ICompanyCard } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';
import {
  headerDataDto, basicInfoDataDto, legalInfoDataDto, contactsIfoDataDto,
} from './dataDto/dataDto';
import { CompanyContactsList } from './components/CompanyContactsList/CompanyContactsList';
import { adminAPI } from '../../services/adminService';
import { Loader } from '../Loader/Loader';
import { useAppSelector } from '../../services/hooks';

export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.user);
  const { uuid } = router.query;
  const { data: response, isLoading } = adminAPI.useGetCurrentCompanyQuery(uuid, { skip: uuid === undefined });
  const headerData = response && headerDataDto(response.company);
  const contactsData = response && contactsIfoDataDto(response.company);
  const handleApprove = () => {
    console.log('Approved!');
  };

  if (response && user.uuid !== response.company?.moderatedAuthorUuid) {
    router.push({ pathname: '/admin/moderation' });
  }

  return (
    <section className={`${styles.company} ${className}`} {...props}>
      {isLoading && <Loader />}
      {response && headerData && contactsData && (
        <>
          <CardHeader data={headerData} />
          <CompanyCharacteristics title="Basic information" data={response.company} dto={basicInfoDataDto} />
          <CompanyContactsList title="Contact information" data={contactsData} />
          <CompanyCharacteristics title="Legal information" data={response.company} dto={legalInfoDataDto} />
          <div className={styles.company__controls}>
            <Link href="/admin/moderation/?modal=approved">
              <a>
                <Button className={styles.company__button} onClick={handleApprove} type="button" appearance="primary">Approve</Button>
              </a>
            </Link>
            <Link href={`/admin/moderation/company/${uuid}/?modal=reject`}>
              <a>
                <Button className={styles.company__button} type="button" appearance="ghost">Reject</Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
