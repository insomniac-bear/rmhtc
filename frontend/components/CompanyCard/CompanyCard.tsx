/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './CompanyCard.module.css';
import { ICompanyCard } from './CompanyCard.props';
import { CardHeader } from './components/CardHeader/CardHeader';
import { CompanyCharacteristics } from './components/CompanyCharacteristics/CompanyCharacteristics';
import { Button } from '../Button/Button';
import {
  headerDataDto,
  basicInfoDataDto,
  legalInfoDataDto,
  contactsIfoDataDto,
} from '../../utils/companyDataDto/companyCardDataDto';
import { CompanyContactsList } from './components/CompanyContactsList/CompanyContactsList';
import { adminAPI } from '../../services/adminService';
import { Loader } from '../Loader/Loader';
import { useAppSelector } from '../../services/hooks';
import { userAPI } from '../../services/userService';
import { ICompanyData } from '../../types';

export const CompanyCard: FC<ICompanyCard> = ({ access, className = '', ...props }) => {
  const [currentCompany, setCurrentCompany] = useState<ICompanyData | null>(null);
  const router = useRouter();
  const { user } = useAppSelector((store) => store.user);
  const { uuid } = router.query;
  const [getCompanyForModerate] = adminAPI.useLazyGetCurrentModerateCompanyQuery();
  const [getCompanyForView] = userAPI.useLazyGetCurrentCompanyQuery();
  const [approveCompany] = adminAPI.useApproveCompanyMutation();
  const headerData = currentCompany && headerDataDto(currentCompany);
  const contactsData = currentCompany && contactsIfoDataDto(currentCompany);

  const handleApprove = () => {
    approveCompany({ uuid });
  };

  useEffect(() => {
    if (access && access === 'admin' && uuid !== undefined) {
      getCompanyForModerate(uuid)
        .then((res) => setCurrentCompany(res.data?.company));
      if (currentCompany && currentCompany?.moderatedAuthorUuid && user.uuid !== currentCompany?.moderatedAuthorUuid) {
        router.push({ pathname: '/admin/moderation' });
      }
    }
    if (access && access === 'general' && uuid !== undefined) {
      getCompanyForView(uuid)
        .then((res) => setCurrentCompany(res.data?.company));
    }
  }, [access, router, user.uuid, uuid]);

  return (
    <section className={`${styles.company} ${className}`} {...props}>
      {!currentCompany && <Loader />}
      {currentCompany && headerData && contactsData && (
        <>
          <CardHeader data={headerData} />
          <CompanyCharacteristics title="Basic information" data={currentCompany} dto={basicInfoDataDto} />
          <CompanyContactsList title="Contact information" data={contactsData} />
          <CompanyCharacteristics title="Legal information" data={currentCompany} dto={legalInfoDataDto} />
          {access === 'admin' && (
            <div className={styles.company__controls}>
              <Link href="/admin/moderation/?modal=approved">
                <a>
                  <Button className={styles.company__button} onClick={handleApprove} type="button" appearance="primary">
                    Approve
                  </Button>
                </a>
              </Link>
              <Link href={`/admin/moderation/company/${uuid}/?modal=reject`}>
                <a>
                  <Button className={styles.company__button} type="button" appearance="ghost">
                    Reject
                  </Button>
                </a>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};
