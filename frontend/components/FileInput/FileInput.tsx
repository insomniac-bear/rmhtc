import { forwardRef } from 'react';
import styles from './FileInput.module.css';

/* eslint-disable arrow-body-style */
export const FileInput = forwardRef(({
  name, onChange, onBlur, errors, message, placeholder, value, className,
}: any, ref: any) => {
  return (
    <label htmlFor={name} className={`${styles.fileInput__wrapper} ${className}`}>
      <input
        value={value}
        type="file"
        className={`${styles.fileInput}`}
        ref={ref}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className={styles.fileInput__placeholder}>
        <span className={styles.fileInput__clipIcon} />
        {placeholder}
      </p>
      <span className={`${styles.fileInput__message} ${errors && styles.fileInput__message_type_error}`}>
        {errors ? `${errors.message}` : `${message || ''}`}
      </span>
    </label>
  );
});
