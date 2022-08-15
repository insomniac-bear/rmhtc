import { FC } from 'react';
import styles from './SimpleSearch.module.css';
import { ISimpleSearch } from './SimpleSearch.props';

export const SimpleSearch: FC<ISimpleSearch> = ({ className, ...props}) => (
  <form className={`${styles.search} ${className}`} {...props}>
    <input
      type="text"
      placeholder="Enter keywords"
    />
    <button type="submit">Search</button>
  </form>
);