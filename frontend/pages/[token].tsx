import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../services/hooks';
import { verifySignupEmailToken } from '../services/slices/users';

const VerifySignupTokenPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token && router.isReady) {
      dispatch(verifySignupEmailToken(token))
        .then(router.push('/?modal=verify_email_success', '/verify-email-success'));
    }
  }, [dispatch, router, router.isReady, token]);

  return (
    <div />
  );
};

export default VerifySignupTokenPage;
