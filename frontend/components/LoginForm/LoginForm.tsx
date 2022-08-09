/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  FC, useRef, useState,
} from 'react';
import { Title } from '../Title/Title';
import { ILoginFormProps } from './LoginForm.props';
import styles from './LoginForm.module.css';
import { Button } from '../Button/Button';
import { CustomInput } from '../CustomInput/CustomInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { setUser, setUserAuth } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
import { useAppDispatch } from '../../services/hooks';
import { Loader } from '../Loader/Loader';

type FormData = {
  email: string;
  password: string;
}

export const LoginForm: FC<ILoginFormProps> = ({ className = '', ...props }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isFormValid, setFormValid] = useState<boolean>(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const [login, { isLoading }] = userAPI.useLoginUserMutation();

  const formRef = useRef<any>(null);

  const changeFormHandler = () => {
    if (formErrorMessage) setFormErrorMessage('');
    const formValidity = formRef.current?.checkValidity() || false;
    setFormValid(formValidity);
  };

  const submitFormHandler = async ({ email, password }: FormData) => {
    try {
      const response: any = await login({ email: email.toLowerCase(), password });
      if (response.data.userData) {
        dispatch(setUser(response.data.userData));
        Cookies.set('accessToken', response.data.accessToken);
        dispatch(setUserAuth(true));
        if (response.data.userData.role === 'USER') router.push('/profile/summary');
        if (response.data.userData.role === 'ADMINISTRATOR') router.push('/admin/moderation');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <form onChange={changeFormHandler} onSubmit={handleSubmit(submitFormHandler)} className={`${styles.loginForm} ${className}`} {...props}>
      {isLoading ? <Loader /> : (
        <>
          <Title className={styles.loginForm__title} tag="h2" size="s">Login</Title>
          <fieldset className={styles.loginForm__fieldset}>
            <CustomInput
              placeholder="Email"
              errors={errors.email}
              label="Email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please input a valid email.',
                },
              })}
            />
            <Link
              href="/registration"
              passHref
            >
              <a className={`${styles.loginForm__link} ${styles.loginForm__link_forgotPass}`}>
                Forgot password?
              </a>
            </Link>
            <PasswordInput
              placeholder="Password"
              errors={errors.password}
              label="Password"
              {...register('password', {
                required: 'Password is required.',
              })}
            />
            <p className={styles.loginForm__errorMessage}>{formErrorMessage}</p>
            <Button disabled={isFormValid} className={styles.loginForm__button} appearance="primary" type="submit">Login</Button>
            <div className={styles.loginForm__caption}>
              <span className={styles.loginForm__captionText}>Don’t have an account?</span>
              <Link href="/?modal=signup" as="/signup">
                <a className={`${styles.loginForm__link} ${styles.loginForm__link_signup}`}>Sign Up</a>
              </Link>
            </div>
          </fieldset>
        </>
      )}
    </form>
  );
};
