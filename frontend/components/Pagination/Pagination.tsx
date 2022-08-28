import { FC, useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import styles from './Pagination.module.css';
import { IPagination } from './Pagination.props';
import { getPages } from './helpers';

export const Pagination: FC<IPagination> = ({
  count, offset, goToPage, className = '', ...props
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(getPages(count, offset));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goForward = () => {
    if (currentPage < pages.length) {
      goToPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };
  const goBack = () => {
    if (currentPage !== 1) {
      goToPage(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav className={`${styles.pagination} ${className}`} {...props}>
      <button type="button" className={styles.pagination__button} onClick={() => goBack()}>
        Back
      </button>
      <ul className={styles.pagination__list}>
        {pages.map((num) => (
          <li
            className={currentPage === num
              ? `${styles.pagination__item_active}`
              : `${styles.pagination__item}`}
            key={nanoid()}
            onClick={() => {
              goToPage(num);
              setCurrentPage(num);
            }}
          >
            <p>{num}</p>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.pagination__button} onClick={() => goForward()}>
        Next
      </button>
    </nav>
  );
};
