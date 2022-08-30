import { FC } from 'react';
import { DirectoryItem } from './components/DirectoryItem/DirectoryItem';
import { EditForm } from './components/EditForm/EditForm';
import styles from './Directory.module.css';
import { IDirectory } from './Directory.props';

export const Directory:FC<IDirectory> = ({
  directory, label, setDirectory, className, ...props
}) => (
  <div className={`${styles.directory} ${className}`} {...props}>
    <p className={styles.directory__columns}>
      <span>{`${label} type`}</span>
      <span>Actions</span>
    </p>
    <ul className={styles.directory__list}>
      {directory.values.map((item) => (
        <li key={item.uuid}>
          <DirectoryItem item={item} fetchParams={directory.fetchParams} setDirectory={setDirectory} />
        </li>
      ))}
      <li>
        <EditForm formType="add" fetchParams={directory.fetchParams} setDirectory={setDirectory} />
      </li>
    </ul>
  </div>
);
