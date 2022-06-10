import { FC } from 'react';
import { ITitleProps } from './Title.props';
import styles from './Title.module.css';

export const Title: FC<ITitleProps> = ({
  tag, size, children, className, ...props
}) => {
  switch (tag) {
    case 'h1':
      return <h1 className={`${styles.title} ${styles[`title_size_${size}`]} ${className}`} {...props}>{children}</h1>;
    case 'h2':
      return <h2 className={`${styles.title} ${styles[`title_size_${size}`]} ${className}`} {...props}>{children}</h2>;
    case 'h3':
      return <h3 className={`${styles.title} ${styles[`title_size_${size}`]} ${className}`} {...props}>{children}</h3>;
    case 'h4':
      return <h4 className={`${styles.title} ${styles[`title_size_${size}`]} ${className}`} {...props}>{children}</h4>;
    default:
      return <div />;
  }
};
