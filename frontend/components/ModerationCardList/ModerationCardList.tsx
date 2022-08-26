import { FC, useEffect } from 'react';
import Link from 'next/link';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { filters } from './cardListMockData';
import { CompanyCardPreview } from '../CompanyCardPreview/CompanyCardPreview';
import { Pagination } from '../Pagination/Pagination';
import { adminAPI } from '../../services/adminService';
import { Loader } from '../Loader/Loader';
import { RadioFilter } from '../RadioFilter/RadioFilter';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => {
  const [getCompanies, { isLoading, data }] = adminAPI.useLazyGetModerateCompaniesQuery();

  useEffect(() => {
    getCompanies('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPage = (num: number | string) => {
    getCompanies(num);
  };

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.moderation_cardList} ${className}`} {...props}>
        {isLoading && <Loader className={styles.moderation__loader} />}
        {data && !isLoading && data.companies.map((item: any) => (
          <li key={item.uuid}>
            <Link href={`/admin/moderation/company/${item.uuid}`} passHref>
              <a>
                <CompanyCardPreview card={item} type="Company" />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {data && data?.count > data.companies.length && (
        <Pagination
          className={styles.moderation__pagination}
          count={data.count}
          offset={data.companies.length}
          goToPage={goToPage}
        />
      )}
      <RadioFilter className={styles.moderation__filter} filters={filters} name="objectType" label="Object type" />
    </section>
  );
};
