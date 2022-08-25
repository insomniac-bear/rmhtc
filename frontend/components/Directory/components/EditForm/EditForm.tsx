/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditForm.module.css';
import { IEditForm } from './EditForm.props';

type FormData = {
  item: string;
};

export const EditForm: FC<IEditForm> = ({
  isFormHidden, label, onAdd, className, ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      item: label,
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0 && e.target.value !== label) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsVisible(false);
    if (label) {
      e.target.value = label;
    }
    if (!label) {
      e.target.value = '';
    }
    if (onAdd) {
      onAdd();
    }
  };
  const submitFormHandler = (data: FormData) => {
    data.item.toLowerCase();
    console.log(data);
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.form} ${className}`} {...props}>
      <input
        type="text"
        className={styles.form__input}
        autoFocus={isFormHidden}
        placeholder={!label ? '+ New item' : ''}
        {...register('item', {
          onChange(e) { handleChange(e); },
          onBlur(e) { handleBlur(e); },
        })}
      />
      {isVisible && <button type="submit" className={styles.form__submitBtn}>Add</button>}
    </form>
  );
};
