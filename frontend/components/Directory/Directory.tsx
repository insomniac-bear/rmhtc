import { FC } from 'react';
import { AddForm } from './components/AddForm/AddForm';
import { EditForm } from './components/EditForm/EditForm';
import styles from './Directory.module.css';
import { IDirectory } from './Directory.props';

export const Directory:FC<IDirectory> = ({ obj, className, ...props }) => (
  <div className={`${styles.directory} ${className}`} {...props}>
    <p className={styles.directory__columns}>
      <span>{obj.type}</span>
      <span>Actions</span>
    </p>
    <ul className={styles.directory__list}>
      {obj.values.map((item: any) => (
        <li key={item.uuid}>
          <EditForm value={item.label} />
        </li>
      ))}
      <li>
        <AddForm label={obj.type} />
      </li>
    </ul>
  </div>
);
