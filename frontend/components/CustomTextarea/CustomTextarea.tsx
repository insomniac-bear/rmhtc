import { forwardRef } from 'react';
import styles from './CustomTextarea.module.css';

/* eslint-disable arrow-body-style */
export const CustomTextarea = forwardRef(({
  name, onChange, onBlur, errors, message, placeholder, value, className,
}: any, ref: any) => {
  return (
    <label htmlFor={name} className={styles.customTextarea__wrapper}>
      <textarea
        value={value}
        className={`${styles.customTextarea} ${className}`}
        ref={ref}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={`${styles.customTextarea__message} ${errors && styles.customTextarea__message_type_error}`}>
        {errors ? `${errors.message}` : `${message || ''}`}
      </span>
    </label>
  );
});
