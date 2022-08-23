import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Events } from '../components/Events/Events';
import { Header } from '../components/Header/Header';
import { Headline } from '../components/Headline/Headline';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Modal } from '../components/Modal/Modal';
import { SetPasswordForm } from '../components/SetPasswordForm/SetPasswordForm';
import { SignupForm } from '../components/SignupForm/SignupForm';
import { SignupSuccessMessage } from '../components/SignupSuccessMessage/SignupSuccessMessage';
import { logoutUser } from '../services/api/api';
import { useAppDispatch } from '../services/hooks';
import { setUserAuth, setUser, clearUser } from '../services/slices/users';
import { userAPI } from '../services/userService';

const Home: NextPage = () => {
  const router = useRouter();

  const isModal = router.query.modal;

  const isSignUpModal = router.query.modal === 'signup';
  const isLoginModal = router.query.modal === 'login';
  const isSignupSuccessModal = router.query.modal === 'signup_success';
  const isVerifyEmailSuccessModal = router.query.modal === 'verify_email_success';

  const [checkAuth] = userAPI.useCheckAuthMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function checkToken() {
      try {
        const response: any = await checkAuth('');
        if (response.data) {
          dispatch(setUserAuth(true));
          dispatch(setUser(response.data.userData));
        } else {
          dispatch(logoutUser);
          dispatch(setUserAuth(false));
          dispatch(clearUser());
        }
      } catch (error: any) {
        console.log(error);
      }
    }
    checkToken();
  }, [checkAuth, dispatch]);

  return (
    <div>
      <Head>
        <title>RMHTC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header middle="navMenu" />
      <Headline />
      <Events />
      {isModal && (
        <>
          {isSignUpModal && (
            <Modal>
              <SignupForm />
            </Modal>
          )}
          {isLoginModal && (
            <Modal>
              <LoginForm />
            </Modal>
          )}
          {isVerifyEmailSuccessModal && (
            <Modal>
              <SetPasswordForm />
            </Modal>
          )}
          {isSignupSuccessModal && (
            <Modal>
              <SignupSuccessMessage />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
