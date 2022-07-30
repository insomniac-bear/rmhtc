import { FC } from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './Filter.module.css';
import { IFilter } from './Filter.props';

export const Filter: FC<IFilter> = ({ filters, className = '', ...props }) => (
  <form className={`${styles.filter} ${className}`} {...props}>
    <h2 className={styles.filter__heading}>Object type</h2>
    <div className={styles.filter__container}>
      {filters.map((filter) => (
        <Checkbox key={filter} className={styles.filter__checkbox} name={filter} isValidated={false}>{filter}</Checkbox>
      ))}
    </div>
    <div className={styles.filter__controls}>
      <Button className={styles.filter__button} type="button">Reset</Button>
      <Button className={styles.filter__button} type="submit" appearance="primary">Apply</Button>
    </div>
  </form>
);
