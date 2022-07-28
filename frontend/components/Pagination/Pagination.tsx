import { FC } from 'react';
import styles from './Pagination.module.css';
import { IPagination } from './Pagination.props';

export const Pagination: FC<IPagination> = ({
  currentPage, pageNumbers, goToPage, goForward, goBack, className = '', ...props
}) => (
  <nav className={`${styles.pagination} ${className}`} {...props}>
    <button type="button" className={styles.pagination__button} onClick={() => goBack()}>
      Back
    </button>
    <ul className={styles.pagination__list}>
      {pageNumbers.map((num) => (
        <li
          className={currentPage === num
            ? `${styles.pagination__item_active}`
            : `${styles.pagination__item}`}
          key={num}
          onClick={() => goToPage(num)}
        >
          <a>{num}</a>
        </li>
      ))}
    </ul>
    <button type="button" className={styles.pagination__button} onClick={() => goForward()}>
      Next
    </button>
  </nav>
);
