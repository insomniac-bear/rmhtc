import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditForm.module.css';
import { IEditForm } from './EditForm.props';

type FormData = {
  item: string;
};

export const EditForm: FC<IEditForm> = ({
  isHidden, label, onAdd, className, ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      item: label,
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length || e.target.value === label) {
      setIsVisible(false);

      if (onAdd) {
        onAdd();
      }
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
        autoFocus={isHidden}
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
