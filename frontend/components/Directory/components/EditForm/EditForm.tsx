/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditForm.module.css';
import { IEditForm } from './EditForm.props';
import editIcon from '../../../../images/edit-icon-secondary.svg';

type FormData = {
  newValue: string;
};

export const EditForm: FC<IEditForm> = ({ value, className, ...props }) => {
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      newValue: value,
    },
  });
  const submitFormHandler = (data: FormData) => {
    data.newValue.toLowerCase();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.form} ${className}`} {...props}>
      <input
        type="text"
        className={styles.form__input}
        {...register('newValue')}
      />
      <button type="submit" className={styles.form__submitBtn}>
        <Image src={editIcon} alt="Edit" />
      </button>
    </form>
  );
};
