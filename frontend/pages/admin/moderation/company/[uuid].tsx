import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CompanyCard } from '../../../../components/CompanyCard/CompanyCard';
import { Modal } from '../../../../components/Modal/Modal';
import { RejectForm } from '../../../../components/RejectForm/RejectForm';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';

const ModerationPage: NextPage = () => {
  const router = useRouter();
  const isModal = router.query.modal;
  const isReject = router.query.modal === 'reject';
  return (
    <div>
      <CompanyCard />
      {isModal && (
        <Modal style={{ width: 'fit-content' }}>
          {isReject && <RejectForm />}
        </Modal>
      )}
    </div>
  );
};

export default withAuthLayout(ModerationPage);