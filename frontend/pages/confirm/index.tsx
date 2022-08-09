import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/hooks';
import { setUser } from '../../services/slices/users';
import { userAPI } from '../../services/userService';
// import { verifySignupEmailToken } from '../../services/slices/users';

const VerifySignupTokenPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = router.query;

  const [confirmEmail] = userAPI.useConfirmEmailMutation();

  useEffect(() => {
    const confirmEmailHandler = async () => {
      const response = await confirmEmail(token);
      return response;
    };

    if (token && router.isReady) {
      confirmEmailHandler()
        .then((res: any) => {
          if (res.data.status === 'success') {
            dispatch(setUser(res.data.data));
            router.push('/?modal=verify_email_success', '/verify-email-success');
          } else {
            throw new Error('Email confirm error.');
          }
        })
        .catch(() => {
          router.push('/');
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmEmail, router, router.isReady, token]);

  return (
    <div />
  );
};

// export async function getServerSideProps(query: any) {
//   const { token } = query.query;

//   const res = await fetch(`http://localhost:8000/api/v1/auth/email-verify?emailToken=${token}`);
//   const data = await res.json();
//   console.log(data);

//   return { props: { data } };
// }

export default VerifySignupTokenPage;
