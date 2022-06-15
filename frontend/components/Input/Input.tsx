import { FC, useRef, useState } from 'react';
import { IInputProps } from './Input.props';
import styles from './Input.module.css';

export const Input: FC<IInputProps> = ({
  className,
  type = 'text',
  name,
  message,
  placeholder,
  required,
  minLength,
  maxLength,
  pattern,
  onChange,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputValid, setInputValid] = useState<boolean>(true);

  const changeInputValueHandler = () => {
    const inputValidity = inputRef.current ? inputRef.current?.validity.valid : false;
    setInputValid(inputValidity);
  };

  return (
    <label htmlFor={name} className={styles.input__wrapper}>
      <input
        pattern={pattern}
        id={name}
        onChange={onChange || changeInputValueHandler}
        ref={inputRef}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        className={`
          ${styles.input}
          ${!isInputValid ? styles.input_type_invalid : ''}
          ${className}
        `}
      />
      {/* {isInputValid ? (
        <span className={`${styles.input__message} ${styles.input__message_type_error}`}>
          {message}
        </span>
      )
        : (
          <span className={`${styles.input__message} ${styles.input__message_type_error}`}>
            {inputRef.current?.validationMessage}
          </span>
        )} */}
      <span className={`${styles.input__message} ${!isInputValid && styles.input__message_type_error}`}>
        {!isInputValid ? `${inputRef.current?.validationMessage}` : `${message || ''}`}
      </span>
    </label>
  );
};
