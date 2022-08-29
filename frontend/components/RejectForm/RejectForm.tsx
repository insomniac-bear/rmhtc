import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './RejectForm.module.css';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { Title } from '../Title/Title';
import { IRejectForm } from './RejectForm.props';
import { Button } from '../Button/Button';
import { adminAPI } from '../../services/adminService';

type FormData = {
  reason: string;
}

export const RejectForm: FC<IRejectForm> = ({ className = '', ...props }) => {
  const router = useRouter();
  const { uuid } = router.query;
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [rejectCompany] = adminAPI.useRejectCompanyMutation();
  const submitFormHandler = (data: FormData) => {
    const { reason } = data;
    rejectCompany({ uuid, reason });
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
