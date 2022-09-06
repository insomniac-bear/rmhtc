import { FC } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { Title } from '../Title/Title';
import styles from './PriceFilter.module.css';
import { IPriceFilter } from './PriceFilter.props';

export const PriceFilter: FC<IPriceFilter> = ({
  register, control, className = '', ...props
}) => (
  <fieldset className={`${styles.filter} ${className}`} {...props}>
    <Title size="s" tag="h2" className={styles.filter__heading}>Price</Title>
    <Controller
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className={styles.filter__select}>
          <Select
            defaultValue="Rubles"
            instanceId="selectCompanyTypeBox"
            id="selectCompanyTypeBox"
            placeholder="Rub"
            // options={businessTypesOptions}
            // styles={customSelectStyles}
            // onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
            // value={options.find((option) => option.value === value)}
          />
        </div>
      )}
      {...register('currency')}
    />
    <label htmlFor="priceField" className={styles.filter__priceWrapper}>
      <input
        id="priceField"
        placeholder="265"
        className={styles.filter__priceInput}
        type="number"
        {...register('from')}
      />
      <span>&ndash;</span>
      <input
        id="priceField"
        placeholder="786 356 560"
        className={styles.filter__priceInput}
        type="number"
        {...register('to')}
      />
    </label>
  </fieldset>
);
