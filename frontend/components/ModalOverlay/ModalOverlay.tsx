import { FC } from 'react';
import styles from './ModalOverlay.module.css';
import { IModalOverlayProps } from './ModalOverLay.props';

export const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal }) => <div role="none" onClick={closeModal} className={`${styles.modalOverlay}`} />;
