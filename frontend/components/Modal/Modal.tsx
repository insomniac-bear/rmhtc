import { FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { IModalProps } from './Modal.props';
import animation from './Modal.animation';

export const Modal: FC<IModalProps> = ({ children, className = '', ...props }) => {
  const router = useRouter();
  return (
    <motion.div
      className={styles.modal__wrapper}
      {...animation}
    >
      <div className={`${styles.modal} ${className}`} {...props}>
        <button aria-label="none" type="button" className={styles.modal__closeBtn} onClick={() => router.back()} />
        {children}
      </div>
      <ModalOverlay closeModal={() => router.back()} />
    </motion.div>
  );
};
