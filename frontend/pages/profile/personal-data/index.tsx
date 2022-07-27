import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { EmailChangeForm } from '../../../components/EmailChangeForm/EmailChangeForm';
import { Modal } from '../../../components/Modal/Modal';
import { NameChangeForm } from '../../../components/NameChangeForm/NameChangeForm';
import { PersonalData } from '../../../components/PersonalData/PersonalData';
import { RoleChangeForm } from '../../../components/RoleChangeForm/RoleChangeForm';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import styles from './personal-data.module.css';

const PersonalDataPage: NextPage = () => {
  const router = useRouter();

  const isModal = router.query.modal;

  const isNameEditModal = router.query.modal === 'edit_name';
  const isEmailEditModal = router.query.modal === 'edit_email';
  const isRoleEditModal = router.query.modal === 'edit_role';

  return (
    <>
      <PersonalData />
      {isModal && (
        <Modal className={styles.personalData__modal}>
          {isNameEditModal && <NameChangeForm />}
          {isEmailEditModal && <EmailChangeForm />}
          {isRoleEditModal && <RoleChangeForm />}
        </Modal>
      )}
    </>
  );
};

export default withAuthLayout(PersonalDataPage);

// export async function getServerSideProps(context: any) {
//   // console.log(context.res.header);

//   const res = await fetch('http://localhost:8000/api/v1/check-auth', {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       Cookie: context.req.headers.cookie,
//     },
//   });
//   const data = await res.json();
//   // console.log(data);

//   return { props: { data } };
// }
