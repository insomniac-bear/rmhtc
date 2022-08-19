import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Checkbox } from '../Checkbox/Checkbox';
import { Title } from '../Title/Title';
import styles from './CheckboxFilter.module.css';
import { ICheckboxFilter } from './CheckboxFilter.props';
import { animation } from './CheckboxFilter.animation';

export const CheckboxFilter: FC<ICheckboxFilter> = ({
  filters, label, className = '', register, fieldName, ...props
}) => {
  // Убрать хардкод фильтра когда появится что-то кроме компаний
  const [isHidden, setIsHidden] = useState(true);
  return (
    <fieldset className={`${styles.filter} ${className}`} {...props}>
      <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
      <div className={styles.filter__container}>
        <AnimatePresence initial={false}>
          {filters.slice(0, 5).map((filter) => (
            <Checkbox
              key={filter.id}
              className={styles.filter__checkbox}
              isValidated={false}
              value={filter.value}
              {...register(fieldName)}
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
                className={styles.filter__checkbox}
                isValidated={false}
                value={filter.value}
                {...register(fieldName)}
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
    </fieldset>
  );
};
