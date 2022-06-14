/* eslint-disable react/button-has-type */
import { FC } from 'react';
import styles from './Button.module.css';
import { IButtonProps } from './Button.props';

export const Button: FC<IButtonProps> = ({
  type, className, onClick, children, appearance, disabled, ...props
}) => (
  <button
    className={`
      ${styles.button}
      ${appearance ? styles[`button_appearance_${appearance}`] : ''}
      ${className}
    `}
    type={type}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
