import { FC } from 'react';
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
  const { data: companiesData, isLoading } = adminAPI.useGetModerateCompaniesQuery('');

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.moderation_cardList} ${className}`} {...props}>
        {isLoading && <Loader className={styles.moderation__loader} />}
        {companiesData && !isLoading && companiesData.companies.map((item: any) => (
          <li key={item.uuid}>
            <Link href={`/admin/moderation/company/${item.uuid}`} passHref>
              <a>
                <CompanyCardPreview card={item} type="Company" />
              </a>
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
      <RadioFilter className={styles.moderation__filter} filters={filters} name="objectType" label="Object type" />
    </section>
  );
};
