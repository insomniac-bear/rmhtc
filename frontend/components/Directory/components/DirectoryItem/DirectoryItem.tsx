import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './DirectoryItem.module.css';
import editIcon from '../../../../images/edit-icon-secondary.svg';
import { IDirectoryItem } from './DirectoryItem.props';
import { EditForm } from '../EditForm/EditForm';

export const DirectoryItem: FC<IDirectoryItem> = ({
  item, fetchParams, className, ...props
}) => {
  const [isEdited, setIsEdited] = useState(false);

  return (
    <div className={`${styles.item} ${className}`} {...props}>
      {!isEdited && (
        <>
          <p className={styles.item__value}>{item.value}</p>
          <button type="button" onClick={() => setIsEdited(true)} className={styles.item__editBtn}>
            <Image src={editIcon} alt="Edit" />
          </button>
        </>
      )}
      {isEdited && (
        <EditForm
          hideForm={() => setIsEdited(false)}
          isFormHidden={isEdited}
          item={item}
          formType="patch"
          fetchParams={fetchParams}
        />
      )}
    </div>
  );
};
