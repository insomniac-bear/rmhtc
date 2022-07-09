import { FC } from 'react';
import styles from './ModalOverlay.module.css';
import { IModalOverlayProps } from './ModalOverLay.props';

export const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal, className = '', ...props }) => (
  <div role="none" onClick={closeModal} className={`${styles.modalOverlay} ${className}`} {...props} />
);
