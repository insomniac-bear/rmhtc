import { FC, useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Title } from '../Title/Title';
import styles from './CheckboxFilter.module.css';
import { ICheckboxFilter } from './CheckboxFilter.props';

export const CheckboxFilter: FC<ICheckboxFilter> = ({
  filters, label, className = '', register, fieldName, ...props
}) => {
  // Container scale settings-----------------------
  const elementsForShow = 5;
  const gap = 10;
  const inputHeight = 16; // checkbox line-height
  //-----------------------------------------------
  const fieldHeight = gap + inputHeight; // input full field height with gap
  const baseHeight = fieldHeight * elementsForShow - gap; // 5 elements + 4 gaps (26 * 5 - 10)
  //-----------------------------------------------
  const [isHidden, setIsHidden] = useState(true);
  const [scale, setScale] = useState(baseHeight);
  const style = filters.length > elementsForShow
    ? { height: `${scale}px`, rowGap: gap }
    : { height: `${filters.length * fieldHeight}px`, rowGap: gap };

  const handleShow = () => {
    setIsHidden(false);
    setScale(baseHeight + fieldHeight * (filters.length - elementsForShow));
  };
  const handleHide = () => {
    setIsHidden(true);
    setScale(baseHeight);
  };

  return (
    <fieldset className={`${styles.filter} ${className}`} {...props}>
      <Title size="s" tag="h2" className={styles.filter__heading}>{label}</Title>
      <div style={style} className={styles.filter__container}>
        {filters.map((filter) => (
          <Checkbox
            key={filter.id}
            className={styles.filter__input}
            isValidated={false}
            value={filter.value}
            {...register(fieldName)}
          >
            {filter.label}
          </Checkbox>
        ))}
      </div>
      {isHidden && filters.length > elementsForShow && (
        <button className={styles.filter__button} onClick={() => handleShow()} type="button">Show more</button>
      )}
      {!isHidden && <button className={styles.filter__button} onClick={() => handleHide()} type="button">Roll up</button>}
    </fieldset>
  );
};
