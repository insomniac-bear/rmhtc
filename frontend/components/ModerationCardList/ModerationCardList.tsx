import {
  FC, useEffect,
} from 'react';
import Link from 'next/link';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCardPreview } from '../CompanyCardPreview/CompanyCardPreview';
import { Pagination } from '../Pagination/Pagination';
import { Filter } from '../Filter/Filter';
import { adminAPI } from '../../services/adminService';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setModerateCompanies } from '../../services/slices/admin';
import { Loader } from '../Loader/Loader';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => {
  const { moderateCompanies } = useAppSelector((store) => store.admin);
  const [getModerateCompanies, { isLoading }] = adminAPI.useGetModerateCompaniesMutation();
  const dispatch = useAppDispatch();
  const filters = Array.from(new Set(cardData.map((item) => item.type)));

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response: any = await getModerateCompanies('');
        dispatch(setModerateCompanies(response.data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
  }, [dispatch, getModerateCompanies]);
  // Убрать хардкод type когда появится что то помимо компаний

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.moderation_cardList} ${className}`} {...props}>
        {isLoading && <Loader />}
        {moderateCompanies && !isLoading && moderateCompanies.map((item: any) => (
          <li key={item.uuid}>
            <Link href={`/admin/moderation/company/${item.uuid}`}>
              <CompanyCardPreview card={item} type="Company" />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        className={styles.moderation__pagination}
        currentPage={1}
        pageNumbers={[1]}
        goToPage={() => 1}
        goForward={() => 1}
        goBack={() => 1}
      />
      <Filter className={styles.moderation__filter} filters={filters} name="objectType" htmlType="radio" />
    </section>
  );
};
