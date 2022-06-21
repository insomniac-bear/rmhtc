import { useRouter } from 'next/router';
import { useAppSelector } from '../../services/hooks';
import { Button } from '../Button/Button';
import styles from './SignupSuccessMessage.module.css';

export const SignupSuccessMessage = () => {
  const router = useRouter();
  const email = useAppSelector((store) => store.user.signupEmail);

  return (
    <div className={styles.signupSuccessMessage}>
      <div className={styles.signupSuccessMessage__text}>
        {`The confirmation link have been sent to ${email ? `${email}` : 'your email'}. Follow this link to continue working with service.`}
      </div>
      <Button className={styles.signupSuccessMessage__button} onClick={() => router.push('/')} type="button" appearance="primary">Ok</Button>
    </div>
  );
};
