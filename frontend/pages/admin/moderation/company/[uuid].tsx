import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CompanyCard } from '../../../../components/CompanyCard/CompanyCard';
import { Modal } from '../../../../components/Modal/Modal';
import { RejectForm } from '../../../../components/RejectForm/RejectForm';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';

const CompanyModerationPage: NextPage = () => {
  const router = useRouter();
  const isModal = router.query.modal;
  const isReject = router.query.modal === 'reject';
  const { uuid } = router.query;

  return (
    <div>
      <CompanyCard access="admin" />
      {isModal && isReject && (
        <Modal onClose={() => router.push(`${uuid}`)} style={{ width: 'fit-content' }}>
          <RejectForm />
        </Modal>
      )}
    </div>
  );
};

export default withAuthLayout(CompanyModerationPage);
