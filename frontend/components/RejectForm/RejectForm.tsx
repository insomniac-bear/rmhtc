import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './RejectForm.module.css';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { Title } from '../Title/Title';
import { IRejectForm } from './RejectForm.props';
import { Button } from '../Button/Button';

type FormData = {
  rejectReason: string;
}

export const RejectForm: FC<IRejectForm> = ({ className = '', ...props }) => {
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const submitFormHandler = (data: FormData) => {
    const { rejectReason } = data;
    console.log(rejectReason);
    router.push('/admin/moderation/?modal=rejected');
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
        label="rejectReason"
        errors={errors.rejectReason}
        {...register('rejectReason', {
          required: 'Reason is required',
        })}
      />
      <div className={styles.form__controls}>
        <Button type="submit" appearance="primary" disabled={!!errors.rejectReason}>Save</Button>
        <Button type="button">Cancel</Button>
      </div>
    </form>
  );
};
