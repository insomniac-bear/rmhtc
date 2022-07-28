import { FC, useCallback, useMemo, useState } from 'react';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCardPreview } from '../CompanyCardPreview/CompanyCardPreview';
import { Pagination } from '../Pagination/Pagination';

export const ModerationCardList: FC<IModerationCardList> = ({ className = '', ...props }) => {
  const [currentPage, setCurrenPage] = useState(1);
  const [elementsPerPage] = useState(6);

  const lastIndex = useMemo(() => currentPage * elementsPerPage, [currentPage, elementsPerPage]);
  const firstIndex = useMemo(() => lastIndex - elementsPerPage, [lastIndex, elementsPerPage]);
  const currentElements = useMemo(() => cardData.slice(firstIndex, lastIndex), [firstIndex, lastIndex]);
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= Math.ceil(cardData.length / elementsPerPage); i++) {
      numbers.push(i);
    }
    return numbers;
  }, [cardData, elementsPerPage]);

  const handleGoToPage = useCallback((num: number) => setCurrenPage(num), []);
  const handleGoForward = useCallback(() => currentPage !== pageNumbers.length && setCurrenPage((prev) => prev + 1), [currentPage]);
  const handleGoBack = useCallback(() => currentPage !== 1 && setCurrenPage((prev) => prev - 1), [currentPage]);

  return (
    <section className={styles.moderation}>
      <ul className={`${styles.cardList} ${className}`} {...props}>
        {currentElements.map((item) => (
          <li key={item.id}>
            <CompanyCardPreview card={item} />
          </li>
        ))}
      </ul>
      <Pagination pageNumbers={pageNumbers} goToPage={handleGoToPage} goForward={handleGoForward} goBack={handleGoBack} />
    </section>
  );
};
