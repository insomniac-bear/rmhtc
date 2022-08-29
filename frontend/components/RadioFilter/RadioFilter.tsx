import { FC, useState } from 'react';
import { Title } from '../Title/Title';
import styles from './RadioFilter.module.css';
import { IRadioFilter } from './RadioFilter.props';
import { Radio } from '../Radio/Radio';

export const RadioFilter: FC<IRadioFilter> = ({
  filters, label, name, className = '', ...props
}) => {
  const [current, setCurrent] = useState(filters[2].id);
  const handleChange = (filter: string | number) => setCurrent(filter);

  return (
    <form className={`${styles.filter} ${className}`} {...props}>
      <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
      <div className={styles.filter__container}>
        {filters.map((filter) => (
          <Radio
            key={filter.id}
            className={styles.filter__checkbox}
            name={filter.label}
            isValidated={false}
            checked={current === filter.id}
            onChange={() => handleChange(filter.id)}
          >
            {filter.label}
          </Radio>
        ))}
      </div>
    </form>
  );
};
