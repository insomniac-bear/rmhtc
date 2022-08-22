import { forwardRef } from 'react';
import styles from './Radio.module.css';

export const Radio = forwardRef(({
  className = '', onChange, children, name, value, errors, isValidated = true, checked,
}: any, ref: any) => (
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
