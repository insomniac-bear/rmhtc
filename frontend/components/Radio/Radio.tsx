import { forwardRef, LegacyRef } from 'react';
import styles from './Radio.module.css';
import { IRadioProps } from './Radio.props';

export const Radio = forwardRef(({
  className = '', onChange, children, name, value, errors, isValidated = true, checked,
}: IRadioProps, ref: LegacyRef<HTMLInputElement>) => (
  <>
    <label htmlFor={name} className={`${styles.checkbox} ${className}`}>
      <input
        onChange={onChange}
        ref={ref}
        id={name}
        name={name}
        value={value}
        className={styles.checkbox__input}
        type="radio"
        checked={checked}
      />
      <span className={styles.checkbox__text}>{children}</span>
    </label>
    {isValidated && <span className={styles.checkbox__errorMessage}>{errors && errors.message}</span>}
  </>
));
