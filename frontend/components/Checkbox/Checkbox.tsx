import { forwardRef } from 'react';
// import { ICheckboxProps } from './Checkbox.props';
import styles from './Checkbox.module.css';

export const Checkbox = forwardRef(({
  className = '', onChange, children, name, errors,
}: any, ref: any) => (
  <>
    <label htmlFor={name} className={`${styles.checkbox} ${className}`}>
      <input
        onChange={onChange}
        ref={ref}
        id={name}
        name={name}
        className={styles.checkbox__input}
        type="checkbox"
      />
      <span className={styles.checkbox__text}>{children}</span>
    </label>
    <span className={styles.checkbox__errorMessage}>{errors && errors.message}</span>
  </>
));
