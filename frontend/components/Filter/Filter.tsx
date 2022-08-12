import { FC, useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './Filter.module.css';
import { IFilter } from './Filter.props';

export const Filter: FC<IFilter> = ({
  filters, name, htmlType, className = '', ...props
}) => {
  // Убрать хардкод фильтра когда появится что-то кроме компаний
  const [current, setCurrent] = useState(filters[2]);
  const handleChange = (filter: string) => setCurrent(filter);

  return (
    <form className={`${styles.filter} ${className}`} {...props}>
      <h2 className={styles.filter__heading}>Object type</h2>
      <div className={styles.filter__container}>
        {filters.map((filter) => (
          <Checkbox
            key={filter}
            htmlType={htmlType}
            className={styles.filter__checkbox}
            name={name}
            isValidated={false}
            checked={filter === current}
            onChange={() => handleChange(filter)}
          >
            {filter}
          </Checkbox>
        ))}
      </div>
    </form>
  );
};
