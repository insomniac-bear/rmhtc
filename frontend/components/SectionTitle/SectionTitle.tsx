import { FC } from 'react';
import { Title } from '../Title/Title';
import { ISectionTitleProps } from './SectionTitle.props';
import styles from './SectionTitle.module.css';

export const SectionTitle: FC<ISectionTitleProps> = ({ children, className = '', ...props }) => (
  <Title className={`${styles.sectionTitle} ${className}`} tag="h2" size="l" {...props}>{children}</Title>
);
