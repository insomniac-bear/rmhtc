import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Events } from '../components/Events/Events';
import { Header } from '../components/Header/Header';
import { Headline } from '../components/Headline/Headline';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Modal } from '../components/Modal/Modal';
import { SetPasswordForm } from '../components/SetPasswordForm/SetPasswordForm';
import { SignupForm } from '../components/SignupForm/SignupForm';
import { SignupSuccessMessage } from '../components/SignupSuccessMessage/SignupSuccessMessage';

const Home: NextPage = () => {
  const router = useRouter();

  const isModal = router.query.modal;

  const isSignUpModal = router.query.modal === 'signup';
  const isLoginModal = router.query.modal === 'login';
  const isSignupSuccessModal = router.query.modal === 'signup_success';
  const isVerifyEmailSuccessModal = router.query.modal === 'verify_email_success';

  return (
    <div>
      <Head>
        <title>RMHTC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Headline />
      <Events />
      {isModal && (
        <Modal>
          {isSignUpModal && <SignupForm />}
          {isSignupSuccessModal && <SignupSuccessMessage />}
          {isLoginModal && <LoginForm />}
          {isVerifyEmailSuccessModal && <SetPasswordForm />}
        </Modal>
      )}
    </div>
  );
};

export default Home;
