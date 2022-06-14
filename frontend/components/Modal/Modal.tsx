/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { IModalProps } from './Modal.props';

export const Modal: FC<IModalProps> = ({ children }) => {
  const router = useRouter();
  return (
    <motion.div
      className={styles.modal__wrapper}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
    >
      <div className={styles.modal}>
        <button type="button" className={styles.modal__closeBtn} onClick={() => router.push('/')} />
        {children}
      </div>
      <ModalOverlay closeModal={() => router.push('/')} />
    </motion.div>
  );
};
