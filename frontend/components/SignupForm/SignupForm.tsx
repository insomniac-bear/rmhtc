/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FC, useState,
} from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

import { Title } from '../Title/Title';
import styles from './SignupForm.module.css';
import { ISignupForm } from './SignupForm.props';
import { CustomInput } from '../CustomInput/CustomInput';
import { userAPI } from '../../services/userService';
import { Loader } from '../Loader/Loader';

type FormData = {
  email: string;
  politics: boolean;
};

export const SignupForm: FC<ISignupForm> = ({ className = '', ...props }): JSX.Element => {
  const router = useRouter();
  const [signup, { isLoading }] = userAPI.useSignupUserMutation();
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const submitFormHandler = async (data: FormData) => {
    const { email } = data;
    try {
      const res: any = await signup(email);
      if (res.data.status === 'success') {
        router.push(`/?modal=signup_success&signupEmail=${email.toLowerCase()}`, '/signup-success');
      } else {
        throw new Error(res.error);
      }
    } catch (error: any) {
      setFormErrorMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      className={`${styles.signupForm} ${className}`}
      {...props}
    >
      {isLoading ? <Loader /> : (
        <>
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
        </>
      )}
    </form>
  );
};
