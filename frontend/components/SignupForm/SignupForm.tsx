// import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FC, SyntheticEvent, useRef, useState,
} from 'react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
// import { registerOwnerUserAction } from '../../services/actions';
// import { useDispatch } from '../../services/hooks';
// import { Checkbox } from '../Checkbox/Checkbox';
// import { CustomLink } from '../CustomLink/CustomLink';
// import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { Title } from '../Title/Title';
import styles from './SignupForm.module.css';
import { ISignupForm } from './SignupForm.props';
// import { EmailInput } from '../EmailInput/EmailInput';

export const SignupForm: FC<ISignupForm> = ({ className = '' }): JSX.Element => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const formRef = useRef<any>(null);

  const [isFormValid, setFormValid] = useState<boolean>(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const changeFormHandler = () => {
    if (formErrorMessage) setFormErrorMessage('');
    const formValidity = formRef.current?.checkValidity();
    setFormValid(formValidity);
  };

  const submitFormHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    // const email = formRef.current?.elements.email.value.toLowerCase();
    // dispatch(registerOwnerUserAction(email))
    //   .then(() => router.push('/registration-success'))
    //   .catch((error: {message: string}) => {
    //     if (error.message === 'Error: 400') {
    //       setFormErrorMessage('Пользователь с таким Email уже зарегистрирован.');
    //     }
    //     if (error.message === 'Error: 500') {
    //       router.push('/500');
    //     }
    //   });
  };

  return (
    <form
      noValidate
      ref={formRef}
      onSubmit={submitFormHandler}
      onChange={changeFormHandler}
      className={`${styles.signupForm} ${className}`}
    >
      <Title className={styles.signupForm__title} tag="h2" size="m">Registration</Title>
      <Input required placeholder="Email" name="email" />
      <Checkbox className={styles.registrationForm__checkbox} required name="politics">
        I confirm that I agree to this web site terms of use and confidential policy.
      </Checkbox>
      <p className={styles.signupForm__errorMessage}>{formErrorMessage}</p>
      <Button disabled={isFormValid} className={styles.signupForm__button} appearance="primary" type="submit">Sign up</Button>
      <div className={styles.signupForm__caption}>
        <span className={styles.signupForm__captionText}>Have an account?</span>
        <Link href="/?modal=login" as="/login">
          <a className={styles.signupForm__link}>
            Sign in
          </a>
        </Link>
      </div>
    </form>
  );
};
