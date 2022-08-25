import { FC } from 'react';
import { DirectoryItem } from './components/DirectoryItem/DirectoryItem';
import { EditForm } from './components/EditForm/EditForm';
import styles from './Directory.module.css';
import { IDirectory } from './Directory.props';

export const Directory:FC<IDirectory> = ({ directory, className, ...props }) => (
  <div className={`${styles.directory} ${className}`} {...props}>
    <p className={styles.directory__columns}>
      <span>{`${directory.label} type`}</span>
      <span>Actions</span>
    </p>
    <ul className={styles.directory__list}>
      {directory.values.map((item: any) => (
        <li key={item.uuid}>
          <DirectoryItem item={item} fetchParams={directory.fetchParams} />
        </li>
      ))}
      <li>
        <EditForm formType="add" fetchParams={directory.fetchParams} />
      </li>
    </ul>
  </div>
);
