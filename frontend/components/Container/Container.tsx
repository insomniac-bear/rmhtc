import { FC } from 'react';
import styles from './Container.module.css';
import { IContainerProps } from './Container.props';

export const Container: FC<IContainerProps> = ({
  isBackgroundLogo = false, className = '', children, ...props
}) => (
  <div
    className={`
      ${styles.container} 
      ${isBackgroundLogo ? styles.container_backgroundLogo : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);
