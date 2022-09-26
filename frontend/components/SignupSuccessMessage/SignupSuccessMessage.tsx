import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { ISignupSuccessMessageProps } from './SignupSuccesMessage.props';
import styles from './SignupSuccessMessage.module.css';

export const SignupSuccessMessage: FC<ISignupSuccessMessageProps> = ({ className = '', ...props }) => {
  const router = useRouter();
  const email = router?.query?.signupEmail;

  return (
    <div className={`${styles.signupSuccessMessage} ${className}`} {...props}>
      <div className={styles.signupSuccessMessage__text}>
        {`The confirmation link have been sent to ${email ? `${email}` : 'your email'}. Follow this link to continue working with service.`}
      </div>
      <Button className={styles.signupSuccessMessage__button} onClick={() => router.push('/')} type="button" appearance="primary">Ok</Button>
    </div>
  );
};
