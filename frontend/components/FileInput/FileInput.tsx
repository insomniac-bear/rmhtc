import { forwardRef, useState } from 'react';
import styles from './FileInput.module.css';

export const FileInput = forwardRef(({
  name, onChange, onBlur, errors, message, placeholder, value, className, multiple, accept,
// eslint-disable-next-line arrow-body-style
}: any, ref: any) => {
  const [addedFiles, setAddedFiles] = useState<File[]>([]);

  const onFileInputChange = (evt: any) => {
    const filesToAdd = evt.nativeEvent.srcElement.files;

    setAddedFiles(filesToAdd);

    onChange(evt);
  };

  return (
    <div className={`${styles.fileInput__wrapper} ${className}`}>
      <label htmlFor={name} className={styles.fileInput__label}>
        <input
          multiple={multiple}
          value={value}
          type="file"
          className={`${styles.fileInput}`}
          ref={ref}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onFileInputChange}
          onBlur={onBlur}
          accept={accept}
        />
        <p className={styles.fileInput__placeholder}>
          <span className={styles.fileInput__clipIcon} />
          {placeholder}
        </p>
      </label>
      {!!addedFiles.length && (
        <ul className={styles.fileInput__fileList}>
          {[...addedFiles].map((file, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {file.name.toLowerCase()}
            </li>
          ))}
        </ul>
      )}
      <span className={`${styles.fileInput__message} ${errors && styles.fileInput__message_type_error}`}>
        {errors ? `${errors.message}` : `${message || ''}`}
      </span>
    </div>
  );
});
