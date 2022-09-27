import { forwardRef, LegacyRef } from 'react';
import styles from './Checkbox.module.css';
import { ICheckboxProps } from './Checkbox.props';

export const Checkbox = forwardRef(({
  className = '', onChange, children, name, value, errors, isValidated = true, checked,
}: ICheckboxProps, ref: LegacyRef<HTMLInputElement>) => (
  <>
    <label htmlFor={name} className={`${styles.checkbox} ${className}`}>
      <input
        onChange={onChange}
        ref={ref}
        id={name}
        name={name}
        value={value}
        className={styles.checkbox__input}
        checked={checked}
        type="checkbox"
      />
      <span className={styles.checkbox__text}>{children}</span>
    </label>
    {isValidated && <span className={styles.checkbox__errorMessage}>{errors && errors.message}</span>}
  </>
));
