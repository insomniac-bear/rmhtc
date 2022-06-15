import { FC } from 'react';
import { ICheckboxProps } from './Checkbox.props';
import styles from './Checkbox.module.css';

export const Checkbox: FC<ICheckboxProps> = ({
  className = '', children, name, required = false, onChange, checked,
}) => (
  <label htmlFor={name} className={`${styles.checkbox} ${className}`}>
    <input checked={checked} onChange={onChange} id={name} required={required} name={name} className={styles.checkbox__input} type="checkbox" />
    <p className={styles.checkbox__text}>{children}</p>
  </label>
);
