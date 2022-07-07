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
import { IEmailChangeFormProps } from './EmailChangeForm.props';
import styles from './EmailChangeForm.module.css';

type FormData = {
  email: string;
}

export const EmailChangeForm: FC<IEmailChangeFormProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((store) => store.user.user);
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: user.email || '',
    },
  });
  const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation();

  const submitFormHandler = async (data: FormData) => {
    try {
      const newUserData: any = await updateUser(data);
      dispatch(setUser(newUserData.data.user));
    } catch (error: any) {
      throw new Error(error);
    } finally {
      router.back();
    }
  };

  return (
    <form className={styles.emailChangeForm} onSubmit={handleSubmit(submitFormHandler)}>
      <Title className={styles.emailChangeForm__title} tag="h3" size="s">Email change</Title>
      <fieldset className={styles.emailChangeForm__fieldset}>
        <div className={styles.emailChangeForm__field}>
          <p className={styles.emailChangeForm__caption}>New email</p>
          <CustomInput
            placeholder="Email"
            errors={errors.email}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please input a valid email.',
              },
            })}
          />
        </div>
      </fieldset>
      <div className={styles.emailChangeForm__buttons}>
        <Button className={styles.emailChangeForm__button} disabled={isLoading} type="submit" appearance="primary">Save</Button>
        <Button className={styles.emailChangeForm__button} onClick={() => router.back()} type="button" appearance="ghost">Cancel</Button>
      </div>
    </form>
  );
};
