import { FC, useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './Filter.module.css';
import { IFilter } from './Filter.props';

export const Filter: FC<IFilter> = ({
  filters, label, name, htmlType, className = '', ...props
}) => {
  // Убрать хардкод фильтра когда появится что-то кроме компаний
  const [current, setCurrent] = useState(filters[2]);
  const [isHidden, setIsHidden] = useState(true);
  const handleChange = (filter: string) => setCurrent(filter);

  return (
    <form className={`${styles.filter} ${className}`} {...props}>
      <h2 className={styles.filter__heading}>{label}</h2>
      <div className={styles.filter__container}>
        {filters.slice(0, 5).map((filter) => (
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
        {!isHidden && filters.slice(5).map((filter) => (
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
      {isHidden && filters.length > 5 && (
        <button className={styles.filter__expandButton} onClick={() => setIsHidden(false)} type="button">Show more</button>
      )}
      {!isHidden && <button className={styles.filter__expandButton} onClick={() => setIsHidden(true)} type="button">Roll up</button>}
      {/* Нужна ли кнопка свернуть ?? */}
    </form>
  );
};
