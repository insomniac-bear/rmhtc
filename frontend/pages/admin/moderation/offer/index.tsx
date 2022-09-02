import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from './OfferModerationPage.module.css';
import { Modal } from '../../../../components/Modal/Modal';
import { OfferCard } from '../../../../components/OfferCard/OfferCard';
import { RejectForm } from '../../../../components/RejectForm/RejectForm';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';

const OfferModerationPage: NextPage = () => {
  const router = useRouter();
  const isModal = router.query.modal;
  const isReject = router.query.modal === 'reject';
  const { uuid } = router.query;

  return (
    <div className={styles.page}>
      <OfferCard />
      {isModal && isReject && (
        <Modal onClose={() => router.push(`${uuid}`)} style={{ width: 'fit-content' }}>
          <RejectForm />
        </Modal>
      )}
    </div>
  );
};

export default withAuthLayout(OfferModerationPage);
