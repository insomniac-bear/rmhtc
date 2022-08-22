import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from '../Title/Title';
import styles from './RadioFilter.module.css';
import { IRadioFilter } from './RadioFilter.props';
import { animation } from './RadioFilter.animation';
import { Radio } from '../Radio/Radio';

export const RadioFilter: FC<IRadioFilter> = ({
  filters, label, name, className = '', ...props
}) => {
  const [current, setCurrent] = useState(filters[2].id);
  const [isHidden, setIsHidden] = useState(true);
  const handleChange = (filter: string | number) => setCurrent(filter);
  return (
    <form className={`${styles.filter} ${className}`} {...props}>
      <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
      <div className={styles.filter__container}>
        <AnimatePresence initial={false}>
          {filters.slice(0, 5).map((filter) => (
            <Radio
              key={filter.id}
              className={styles.filter__checkbox}
              name={name}
              isValidated={false}
              checked={current === filter.id}
              onChange={() => handleChange(filter.id)}
            >
              {filter.label}
            </Radio>
          ))}
          {!isHidden && filters.slice(5).map((filter) => (
            <motion.div
              key={filter.id}
              {...animation}
            >
              <Radio
                className={styles.filter__checkbox}
                name={name}
                isValidated={false}
                checked={current === filter.id}
                onChange={() => handleChange(filter.id)}
              >
                {filter.label}
              </Radio>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {isHidden && filters.length > 5 && (
        <button className={styles.filter__expandButton} onClick={() => setIsHidden(false)} type="button">Show more</button>
      )}
      {!isHidden && <button className={styles.filter__expandButton} onClick={() => setIsHidden(true)} type="button">Roll up</button>}
    </form>
  );
};
