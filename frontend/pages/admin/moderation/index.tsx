import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ModerationCardList } from '../../../components/ModerationCardList/ModerationCardList';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';
import { Modal } from '../../../components/Modal/Modal';
import { ModerationMessage } from '../../../components/ModerationMessage/ModerationMessage';

const ModerationPage: NextPage = () => {
  const router = useRouter();
  const isModal = router.query.modal;
  const isApproved = router.query.modal === 'approved';
  const isRejected = router.query.modal === 'rejected';
  return (
    <>
      <ModerationCardList />
      {isModal && (
        <>
          {isApproved && (
            <Modal onClose={() => router.push(router.pathname)} style={{ width: 'fit-content' }}>
              <ModerationMessage message="Сompany successfully published" />
            </Modal>
          )}
          {isRejected && (
            <Modal onClose={() => router.push(router.pathname)} style={{ width: 'fit-content' }}>
              <ModerationMessage message="Сompany rejected" />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default withAuthLayout(ModerationPage);
