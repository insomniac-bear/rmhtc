/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setUser } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { Button } from '../Button/Button';
import { CustomInput } from '../CustomInput/CustomInput';
import { Title } from '../Title/Title';
import { IRoleChangeFormProps } from './RoleChangeForm.props';
import styles from './roleChangeForm.module.css';

type FormData = {
  businessRole: string;
}

export const RoleChangeForm: FC<IRoleChangeFormProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((store) => store.user.user);
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      businessRole: user.businessRole || '',
    },
  });
  const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation();

  const submitFormHandler = async (data: FormData) => {
    try {
      const newUserData: any = await updateUser(data);
      dispatch(setUser(newUserData.data.userData));
    } catch (error: any) {
      throw new Error(error);
    } finally {
      router.back();
    }
  };

  return (
    <form className={styles.roleChangeForm} onSubmit={handleSubmit(submitFormHandler)}>
      <Title className={styles.roleChangeForm__title} tag="h3" size="s">Business role change</Title>
      <fieldset className={styles.roleChangeForm__fieldset}>
        <div className={styles.roleChangeForm__field}>
          <p className={styles.roleChangeForm__caption}>New business role</p>
          <CustomInput
            placeholder="Role"
            errors={errors.businessRole}
            {...register('businessRole', {
              required: 'Role is required.',
            })}
          />
        </div>
      </fieldset>
      <div className={styles.roleChangeForm__buttons}>
        <Button className={styles.roleChangeForm__button} disabled={isLoading} type="submit" appearance="primary">Save</Button>
        <Button className={styles.roleChangeForm__button} onClick={() => router.back()} type="button" appearance="ghost">Cancel</Button>
      </div>
    </form>
  );
};
