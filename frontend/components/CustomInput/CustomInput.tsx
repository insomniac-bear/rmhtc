import { forwardRef } from 'react';
import styles from './CustomInput.module.css';

/* eslint-disable arrow-body-style */
export const CustomInput = forwardRef(({
  name, onChange, onBlur, errors, message, placeholder, type = 'text', value,
}: any, ref: any) => {
  return (
    <label htmlFor={name} className={styles.customInput__wrapper}>
      <input
        value={value}
        type={type}
        className={styles.customInput}
        ref={ref}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={`${styles.customInput__message} ${errors && styles.customInput__message_type_error}`}>
        {errors ? `${errors.message}` : `${message || ''}`}
      </span>
    </label>
  );
});
