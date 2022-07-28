import { FC, useCallback, useMemo, useState } from 'react';
import styles from './ModerationCardList.module.css';
import { IModerationCardList } from './ModerationCardList.props';
import { cardData } from './cardData';
import { CompanyCard } from '../CompanyCard/CompanyCard';
import { Pagination } from '../Pagination/Pagination';

export const ModerationCardList: FC<IModerationCardList> = () => {
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

  console.log(currentPage);

  const handleGoToPage = useCallback((num: number) => setCurrenPage(num), []);
  const handleGoForward = useCallback(() => currentPage !== pageNumbers.length && setCurrenPage((prev) => prev + 1), [currentPage]);
  const handleGoBack = useCallback(() => currentPage !== 1 && setCurrenPage((prev) => prev - 1), [currentPage]);

  return (
    <section className={styles.moderation}>
      <ul className={styles.cardList}>
        {currentElements.map((item: any) => (
          <li key={item.id}>
            <CompanyCard card={item} />
          </li>
        ))}
      </ul>
      <Pagination pageNumbers={pageNumbers} goToPage={handleGoToPage} goForward={handleGoForward} goBack={handleGoBack} />
    </section>
  );
};
