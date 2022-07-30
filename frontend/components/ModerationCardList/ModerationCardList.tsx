import {
  FC, useCallback, useMemo, useState,
} from 'react';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCardPreview } from '../CompanyCardPreview/CompanyCardPreview';
import { Pagination } from '../Pagination/Pagination';
import { Filter } from '../Filter/Filter';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => {
  const [currentPage, setCurrenPage] = useState(1);
  const [elementsPerPage] = useState(6);

  const lastIndex = useMemo(() => currentPage * elementsPerPage, [currentPage, elementsPerPage]);
  const firstIndex = useMemo(() => lastIndex - elementsPerPage, [lastIndex, elementsPerPage]);
  const currentElements = useMemo(() => cardData.slice(firstIndex, lastIndex), [firstIndex, lastIndex]);
  const pageNumbers = useMemo(() => new Array(Math.ceil(cardData.length / elementsPerPage)).fill(1).map((_a, i) => i + 1), [elementsPerPage]);

  const handleGoToPage = useCallback((num: number) => setCurrenPage(num), []);
  const handleGoForward = useCallback(
    () => currentPage !== pageNumbers.length && setCurrenPage((prev) => prev + 1),
    [currentPage, pageNumbers.length],
  );
  const handleGoBack = useCallback(() => currentPage !== 1 && setCurrenPage((prev) => prev - 1), [currentPage]);
  const filters = Array.from(new Set(cardData.map((item) => item.type)));

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.moderation_cardList} ${className}`} {...props}>
        {currentElements.map((item) => (
          <li key={item.id}>
            <CompanyCardPreview card={item} />
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
      <Filter className={styles.moderation__filter} filters={filters} />
    </section>
  );
};
