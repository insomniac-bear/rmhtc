import { forwardRef, LegacyRef } from 'react';
import styles from './SearchFilter.module.css';
import { Title } from '../Title/Title';
import { ISearchFilter } from './SearchFilter.props';

export const SearchFilter = forwardRef(({
  label, fieldName, placeholder, className = '', ...props
}: ISearchFilter, ref: LegacyRef<HTMLInputElement>) => (
  <fieldset className={`${styles.filter} ${className}`} {...props}>
    <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
    <label htmlFor={fieldName} className={styles.filter__inputContainer}>
      <input
        className={styles.filter_input}
        placeholder={placeholder}
        type="text"
        ref={ref}
      />
    </label>
  </fieldset>
));
