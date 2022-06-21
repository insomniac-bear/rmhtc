import {
  forwardRef, useState,
} from 'react';
import styles from './PasswordInput.module.css';

export const PasswordInput = forwardRef(({
  placeholder, name, onChange, onBlur, errors, message, className = '',
}: any, ref: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <label htmlFor={name} className={styles.passwordInput__label}>
      <input
        ref={ref}
        placeholder={placeholder}
        id={name}
        onChange={onChange}
        type={visible ? 'text' : 'password'}
        name={name}
        className={`
          ${styles.passwordInput}
          ${className}
        `}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={name}
        className={`
          ${styles.passwordInput__setVisibleBtn}
          ${visible ? styles.passwordInput__setVisibleBtn_type_hide : styles.passwordInput__setVisibleBtn_type_show}
          ${styles.passwordInput__setVisibleBtn}
        `}
      />
      <span className={`${styles.passwordInput__message} ${errors && styles.passwordInput__message_type_error}`}>
        {errors ? `${errors.message}` : `${message || ''}`}
      </span>
    </label>
  );
});
