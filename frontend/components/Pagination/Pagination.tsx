import { FC } from 'react';
import styles from './Pagination.module.css';
import { IPagination } from './Pagination.props';

export const Pagination: FC<IPagination> = ({
  pageNumbers, goToPage, goForward, goBack, className = '', ...props
}) => (
  <nav className={`${styles.pagination} ${className}`} {...props}>
    <button type="button" className={styles.paginationButton} onClick={() => goBack()}>
      Back
    </button>
    <ul className={styles.paginationList}>
      {pageNumbers.map((num) => (
        <li className={styles.paginationItem} key={num} onClick={() => goToPage(num)}>
          <a>{num}</a>
        </li>
      ))}
    </ul>
    <button type="button" className={styles.paginationButton} onClick={() => goForward()}>
      Next
    </button>
  </nav>
);
