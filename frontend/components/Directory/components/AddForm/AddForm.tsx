import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddForm.module.css';
import { IAddForm } from './AddForm.props';

type FormData = {
  newItem: string;
};

export const AddForm: FC<IAddForm> = ({ label, className, ...props }) => {
  const { handleSubmit, register } = useForm<FormData>();

  const submitFormHandler = (data: FormData) => {
    data.newItem.toLowerCase();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.form} ${className}`} {...props}>
      <input
        type="text"
        className={styles.form__input}
        placeholder={`+ New ${label.toLowerCase()}`}
        {...register('newItem')}
      />
      <button type="submit" className={styles.form__submitBtn}>Add</button>
    </form>
  );
};
