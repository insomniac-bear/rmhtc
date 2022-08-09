import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RejectForm.module.css';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { Title } from '../Title/Title';
import { IRejectForm } from './RejectForm.props';
import { Button } from '../Button/Button';

type FormData = {
  reason: string;
}

export const RejectForm: FC<IRejectForm> = ({ className = '', ...props }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const submitFormHandler = (data: FormData) => {
    const { reason } = data;
    console.log(reason);
  };

  return (
    <form
      className={`${styles.form} ${className}`}
      onSubmit={handleSubmit(submitFormHandler)}
      {...props}
    >
      <Title size="s" tag="h2" className={styles.form__title}>Reject reason</Title>
      <CustomTextarea
        className={styles.form__textarea}
        placeholder="Enter reject reason"
        label="reason"
        errors={errors.reason}
        {...register('reason', {
          required: 'Reason is required',
        })}
      />
      <div className={styles.form__controls}>
        <Button type="submit" appearance="primary" disabled={!!errors.reason}>Save</Button>
        <Button type="button">Cancel</Button>
      </div>
    </form>
  );
};
