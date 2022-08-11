import {
  FC, useCallback, useEffect, useMemo, useState,
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
// import { setModerateCompanies} from '../../services/slices/admin';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => {
  const { moderateCompanies } = useAppSelector((store) => store.admin);
  const [getUserCompanies] = adminAPI.useGetUserCompaniesMutation();

  const [currentPage, setCurrenPage] = useState(1);
  const [elementsPerPage] = useState(6);

  const lastIndex = useMemo(() => currentPage * elementsPerPage, [currentPage, elementsPerPage]);
  const firstIndex = useMemo(() => lastIndex - elementsPerPage, [lastIndex, elementsPerPage]);
  const currentElements = useMemo(() => moderateCompanies?.slice(firstIndex, lastIndex), [firstIndex, lastIndex]);
  const pageNumbers = useMemo(() => new Array(Math.ceil(cardData.length / elementsPerPage)).fill(1).map((_a, i) => i + 1), [elementsPerPage]);

  const handleGoToPage = useCallback((num: number) => setCurrenPage(num), []);
  const handleGoForward = useCallback(
    () => currentPage !== pageNumbers.length && setCurrenPage((prev) => prev + 1),
    [currentPage, pageNumbers.length],
  );
  const handleGoBack = useCallback(() => currentPage !== 1 && setCurrenPage((prev) => prev - 1), [currentPage]);
  const filters = Array.from(new Set(cardData.map((item) => item.type)));

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response: any = await getUserCompanies('');
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    getCompanies();
  }, []);

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.moderation_cardList} ${className}`} {...props}>
        {currentElements?.map((item) => (
          <li key={item.id}>
            <Link href={`/admin/moderation/company/${item.id}`}>
              <CompanyCardPreview card={item} />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        className={styles.moderation__pagination}
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        goToPage={handleGoToPage}
        goForward={handleGoForward}
        goBack={handleGoBack}
      />
      <Filter className={styles.moderation__filter} filters={filters} name="objectType" htmlType="radio" />
    </section>
  );
};
