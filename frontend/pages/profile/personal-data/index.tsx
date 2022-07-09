import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { EmailChangeForm } from '../../../components/EmailChangeForm/EmailChangeForm';
import { Modal } from '../../../components/Modal/Modal';
import { NameChangeForm } from '../../../components/NameChangeForm/NameChangeForm';
import { PersonalData } from '../../../components/PersonalData/PersonalData';
import { RoleChangeForm } from '../../../components/RoleChangeForm/RoleChangeForm';
import { withProfileLayout } from '../../../layouts/ProfileLayout/ProfileLayout';
import styles from './personal-data.module.css';

const SummaryPage: NextPage = () => {
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

export default withProfileLayout(SummaryPage);
