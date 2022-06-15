// import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FC, FormEvent, useRef, useState,
} from 'react';
import { Title } from '../Title/Title';
import { ILoginFormProps } from './LoginForm.props';
import styles from './LoginForm.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
// import { EmailInput } from '../EmailInput/EmailInput';
// import { PasswordInput } from '../PasswordInput/PasswordInput';
// import { CustomLink } from '../CustomLink/CustomLink';
// import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
// import { Checkbox } from '../Checkbox/Checkbox';

export const LoginForm: FC<ILoginFormProps> = ({ className = '' }) => {
  // const router = useRouter();
  const [isFormValid, setFormValid] = useState<boolean>(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const formRef = useRef<any>(null);

  const changeFormHandler = () => {
    if (formErrorMessage) setFormErrorMessage('');
    const formValidity = formRef.current?.checkValidity() || false;
    setFormValid(formValidity);
  };

  const submitFormHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // const email = formRef.current?.elements.email.value;
    // const password = formRef.current?.elements.password.value;
    // dispatch(loginAction(email, password))
    //   .then(() => router.push('/profile/companies'))
    //   .catch((error: {message: string}) => {
    //     if (error.message === 'Error: 400') {
    //       setFormErrorMessage('Переданые некорректные данные.');
    //     }
    //     if (error.message === 'Error: 403') {
    //       setFormErrorMessage('Неверный логин или пароль.');
    //     }
    //     if (error.message === 'Error: 500') {
    //       router.push('/500');
    //     }
    //   });
  };

  return (
    <form ref={formRef} onChange={changeFormHandler} onSubmit={submitFormHandler} className={`${styles.loginForm} ${className}`}>
      <Title className={styles.loginForm__title} tag="h2" size="s">Login</Title>
      <fieldset className={styles.loginForm__fieldset}>
        <Input
          name="email"
          placeholder="Email"
          required
          message=""
        />
        <Link
          className={styles.loginForm__link}
          href="/registration"
          passHref
        >
          <a className={styles.loginForm__link}>
            Forgot password?
          </a>
        </Link>
        <Input
          name="password"
          placeholder="Password"
          required
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
    </form>
  );
};
