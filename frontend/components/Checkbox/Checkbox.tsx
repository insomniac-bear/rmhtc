import { forwardRef } from 'react';
import styles from './Checkbox.module.css';

export const Checkbox = forwardRef(({
  className = '', onChange, children, name, errors, isValidated = true, checked,
}: any, ref: any) => (
  <>
    <label htmlFor={name} className={`${styles.checkbox} ${className}`}>
      <input
        onChange={onChange}
        ref={ref}
        id={name}
        name={name}
        className={styles.checkbox__input}
        checked={checked}
        type="checkbox"
      />
      <span className={styles.checkbox__text}>{children}</span>
    </label>
    {isValidated && <span className={styles.checkbox__errorMessage}>{errors && errors.message}</span>}
  </>
));
