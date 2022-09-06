import { FC } from 'react';
import styles from './SearchFilter.module.css';
import { Title } from '../Title/Title';
import { ISearchFilter } from './SearchFilter.porps';

export const SearchFilter: FC<ISearchFilter> = ({
  label, fieldName, placeholder, register, className = '', ...props
}) => (
  <fieldset className={`${styles.filter} ${className}`} {...props}>
    <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
    <label htmlFor={fieldName} className={styles.filter__inputContainer}>
      <input
        className={styles.filter_input}
        placeholder={placeholder}
        type="text"
        {...register(fieldName)}
      />
    </label>
  </fieldset>
);
