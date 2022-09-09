import { FC } from 'react';
import { Title } from '../Title/Title';
import styles from './PriceFilter.module.css';
import { IPriceFilter } from './PriceFilter.props';

const options = [
  { value: 'rub', label: 'Rubles', id: '1' },
  { value: 'myr', label: 'Ringgit', id: '2' },
  { value: 'usd', label: 'Dollar', id: '3' },
  { value: 'eur', label: 'Euro', id: '4' },
  { value: 'uah', label: 'Yuan', id: '5' },
];

export const PriceFilter: FC<IPriceFilter> = ({
  register, className = '', ...props
}) => (
  <fieldset className={`${styles.filter} ${className}`} {...props}>
    <Title size="s" tag="h2" className={styles.filter__heading}>Price</Title>
    {/* Нужно заменить на react-select */}
    <select className={styles.filter__select} {...register('currency')}>
      {options.map((option) => (
        <option key={option.id} className={styles.filter__option} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label htmlFor="priceField" className={styles.filter__priceWrapper}>
      <input
        id="priceField"
        placeholder="265"
        className={styles.filter__priceInput}
        type="number"
        {...register('priceFrom')}
      />
      <span>&ndash;</span>
      <input
        id="priceField"
        placeholder="786 356 560"
        className={styles.filter__priceInput}
        type="number"
        {...register('priceTo')}
      />
    </label>
  </fieldset>
);
