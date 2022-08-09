import { FC } from 'react';
import router from 'next/router';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setUser, setUserAuth } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { Button } from '../Button/Button';
import { CustomInput } from '../CustomInput/CustomInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Title } from '../Title/Title';
import styles from './SetPasswordForm.module.css';
import { Loader } from '../Loader/Loader';
import { ISetPasswordForm } from './SetPasswordForm.props';

type FormData = {
  password: string;
  confirmPassword: string;
  company: string;
  businessRole: string;
}

export const SetPasswordForm: FC<ISetPasswordForm> = ({ className = '', ...props }) => {
  const {
    handleSubmit, register, watch, formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);

  const [confirmUserInfo, { isLoading }] = userAPI.useConfirmUserInfoMutation();

  const watchAllFields = watch();

  const submitFormHandler = async (data: FormData) => {
    const preparedData = { ...data, uuid: user.uuid };
    try {
      const userData: any = await confirmUserInfo(preparedData);
      if (userData.data.status === 'success') {
        dispatch(setUser(userData.data));
        Cookies.set('accessToken', userData.data.accessToken);
        dispatch(setUserAuth(true));
        router.push('/profile/summary');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.setPasswordForm} ${className}`} {...props}>
      {isLoading ? <Loader /> : (
        <>
          <Title tag="h3" size="s">Successful registration!</Title>
          <p className={styles.setPasswordForm__caption}>Finally, enter the data to start working with the service.</p>
          <fieldset className={styles.setPasswordForm__fieldset}>
            <PasswordInput
              placeholder="Password"
              errors={errors.password}
              label="password"
              {...register('password', {
                required: 'Password is required.',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: 'Please, input correct password',
                },
              })}
            />
            <PasswordInput
              placeholder="Confirm password"
              errors={errors.confirmPassword}
              label="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm password is required.',
                validate: (value) => value === watchAllFields.password || 'The passwords do not match.',
              })}
            />
            <CustomInput
              placeholder="Company name"
              errors={errors.company}
              label="company"
              {...register('company', {
                required: 'Company name is required.',
              })}
            />
            <CustomInput
              placeholder="Business role in company"
              errors={errors.businessRole}
              label="role"
              {...register('businessRole', {
                required: 'Business role in company is required.',
              })}
            />
          </fieldset>
          <Button className={styles.setPasswordForm__button} type="submit" appearance="primary">Save</Button>
        </>
      )}
    </form>
  );
};
