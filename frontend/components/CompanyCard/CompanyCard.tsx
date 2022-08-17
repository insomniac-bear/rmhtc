import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './CompanyCard.module.css';
import { ICompanyData } from '../../types';
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
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { adminAPI } from '../../services/adminService';
import { setModerateCompanies } from '../../services/slices/admin';
import { Loader } from '../Loader/Loader';

export const CompanyCard: FC<ICompanyCard> = ({ className = '', ...props }) => {
  const { moderateCompanies } = useAppSelector((store) => store.admin);
  // Поменять на запрос одной конкретной компании когда будет endpoint--------------------
  const [getModerateCompanies, { isLoading }] = adminAPI.useGetModerateCompaniesMutation();
  const dispatch = useAppDispatch();
  //-------------------------------------------------------------------------------------
  const router = useRouter();
  const { uuid } = router.query;
  const companyData: ICompanyData | undefined = moderateCompanies.find((el: ICompanyData) => el.uuid === uuid);
  const headerData = companyData && headerDataDto(companyData);
  const contactsData = companyData && contactsIfoDataDto(companyData);
  const handleApprove = () => {
    console.log('Approved!');
  };
  const handleReject = () => {
    console.log('Rejected!');
  };

  useEffect(() => {
    // Поменять на запрос одной конкретной компании когда будет endpoint--------------------
    const getCompanies = async () => {
      try {
        const response: any = await getModerateCompanies('');
        dispatch(setModerateCompanies(response.data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
    //-------------------------------------------------------------------------------------
  }, [dispatch, getModerateCompanies]);
  return (
    <section className={`${styles.company} ${className}`} {...props}>
      {isLoading && <Loader />}
      {companyData && headerData && !isLoading && (
        <>
          <CardHeader data={headerData} />
          <CompanyCharacteristics title="Basic information" data={companyData} dto={basicInfoDataDto} />
          <CompanyContactsList title="Contact information" data={contactsData} />
          <CompanyCharacteristics title="Legal information" data={companyData} dto={legalInfoDataDto} />
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
                <Button className={styles.company__button} onClick={handleReject} type="button" appearance="ghost">
                  Reject
                </Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
