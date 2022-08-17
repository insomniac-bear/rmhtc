import { FC, useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { adminAPI } from '../../services/adminService';
import { setCurrentCompany } from '../../services/slices/admin';
import { Loader } from '../Loader/Loader';

export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const { currentCompany } = useAppSelector((store) => store.admin);
  const [getCompany, { isLoading }] = adminAPI.useGetCurrentCompanyMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uuid } = router.query;
  const headerData = currentCompany && headerDataDto(currentCompany);
  const contactsData = currentCompany && contactsIfoDataDto(currentCompany);
  const handleApprove = () => {
    console.log('Approved!');
  };
  const handleReject = () => {
    console.log('Rejected!');
  };
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response: any = await getCompany(uuid);
        dispatch(setCurrentCompany(response.data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
  }, [dispatch, getCompany, uuid]);
  return (
    <section className={`${styles.company} ${className}`} {...props}>
      {isLoading && <Loader />}
      {currentCompany && headerData && contactsData && !isLoading && (
        <>
          <CardHeader data={headerData} />
          <CompanyCharacteristics title="Basic information" data={currentCompany} dto={basicInfoDataDto} />
          <CompanyContactsList title="Contact information" data={contactsData} />
          <CompanyCharacteristics title="Legal information" data={currentCompany} dto={legalInfoDataDto} />
          <div className={styles.company__controls}>
            <Link href="/admin/moderation/?modal=approved">
              <a>
                <Button className={styles.company__button} onClick={handleApprove} type="button" appearance="primary">Approve</Button>
              </a>
            </Link>
            <Link href={`/admin/moderation/company/${uuid}/?modal=reject`}>
              <a>
                <Button className={styles.company__button} onClick={handleReject} type="button" appearance="ghost">Reject</Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
