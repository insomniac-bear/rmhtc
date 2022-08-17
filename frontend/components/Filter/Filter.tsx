import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Checkbox } from '../Checkbox/Checkbox';
import { Title } from '../Title/Title';
import styles from './Filter.module.css';
import { IFilter } from './Filter.props';
import { animation } from './Filter.animation';

export const Filter: FC<IFilter> = ({
  filters, label, name, htmlType, className = '', ...props
}) => {
  // Убрать хардкод фильтра когда появится что-то кроме компаний
  const [current, setCurrent] = useState(filters[2].id);
  const [isHidden, setIsHidden] = useState(true);
  const handleChange = (filter: string | number) => setCurrent(filter);

  return (
    <form className={`${styles.filter} ${className}`} {...props}>
      <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
      <div className={styles.filter__container}>
        <AnimatePresence initial={false}>
          {filters.slice(0, 5).map((filter) => (
            <Checkbox
              key={filter.id}
              htmlType={htmlType}
              className={styles.filter__checkbox}
              name={name}
              isValidated={false}
              checked={filter.id === current}
              onChange={() => handleChange(filter.id)}
            >
              {filter.label}
            </Checkbox>
          ))}
          {!isHidden && filters.slice(5).map((filter) => (
            <motion.div
              key={filter.id}
              {...animation}
            >
              <Checkbox
                htmlType={htmlType}
                className={styles.filter__checkbox}
                name={name}
                isValidated={false}
                checked={filter.id === current}
                onChange={() => handleChange(filter.id)}
              >
                {filter.label}
              </Checkbox>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {isHidden && filters.length > 5 && (
        <button className={styles.filter__expandButton} onClick={() => setIsHidden(false)} type="button">Show more</button>
      )}
      {!isHidden && <button className={styles.filter__expandButton} onClick={() => setIsHidden(true)} type="button">Roll up</button>}
      {/* Нужна ли кнопка свернуть ?? */}
    </form>
  );
};
