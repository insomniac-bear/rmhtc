/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FC, useState,
} from 'react';
import { useAppDispatch } from '../../services/hooks';
import { signup } from '../../services/slices/users';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

import { Title } from '../Title/Title';
import styles from './SignupForm.module.css';
import { ISignupForm } from './SignupForm.props';
import { CustomInput } from '../CustomInput/CustomInput';

type FormData = {
  email: string;
  politics: boolean;
};

export const SignupForm: FC<ISignupForm> = ({ className = '' }): JSX.Element => {
  // const dispatch = useDispatch();
  const router = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const dispatch = useAppDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const submitFormHandler = (data: FormData) => {
    const { email } = data;

    dispatch(signup(email))
      .then(() => router.push('/?modal=signup_success', '/signup-success'))
      .catch((error: {message: string}) => {
        if (error.message === 'Error: 400') {
          setFormErrorMessage('Пользователь с таким Email уже зарегистрирован.');
        }
      });

    // dispatch(registerOwnerUserAction(email))
    //   .then(() => router.push('/registration-success'))
    //   .catch((error: {message: string}) => {
    //     if (error.message === 'Error: 400') {
    //       setFormErrorMessage('Пользователь с таким Email уже зарегистрирован.');
    //     }
    // });
  };

  // const testSubmit = (data: any) => {
  //   console.log({ data });
  // };

  return (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      className={`${styles.signupForm} ${className}`}
    >
      <Title className={styles.signupForm__title} tag="h2" size="m">Registration</Title>
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
      <Checkbox
        errors={errors.politics}
        className={styles.registrationForm__checkbox}
        {...register('politics', {
          required: 'Agreement is required.',
        })}
      >
        I confirm that I agree to this web site terms of use and confidential policy.
      </Checkbox>
      <p className={styles.signupForm__errorMessage}>{formErrorMessage}</p>
      <Button disabled={!!errors.email || !!errors.politics} className={styles.signupForm__button} appearance="primary" type="submit">Sign up</Button>
      <div className={styles.signupForm__caption}>
        <span className={styles.signupForm__captionText}>Have an account?</span>
        <Link href="/?modal=login" as="/login">
          <a className={styles.signupForm__link}>Sign in</a>
        </Link>
      </div>
    </form>
  );
};
