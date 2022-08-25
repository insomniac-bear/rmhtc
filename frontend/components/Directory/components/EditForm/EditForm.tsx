/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { adminAPI } from '../../../../services/adminService';
import styles from './EditForm.module.css';
import { IEditForm } from './EditForm.props';

type FormData = {
  itemValue: string;
};

export const EditForm: FC<IEditForm> = ({
  isFormHidden, formType, item, hideForm, fetchParams, className, ...props
}) => {
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      itemValue: item?.value,
    },
  });
  const [patchItem] = adminAPI.usePatchDirectoryItemMutation();
  const [postItem] = adminAPI.usePostNewDirectoryItemMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsBtnVisible(true);
    } else {
      setIsBtnVisible(false);
    }
  };

  // const handleBlur = () => {
  //   setIsVisible(false);
  //   if (onAdd) {
  //     onAdd();
  //   }
  // };
  const submitFormHandler = (data: FormData) => {
    const value = data.itemValue;
    if (formType === 'patch') {
      patchItem({
        route: fetchParams.route, type: fetchParams.type, uuid: item.uuid, value,
      });
    }
    if (formType === 'add') {
      postItem({
        route: fetchParams.route, type: fetchParams.type, value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.form} ${className}`} {...props}>
      <input
        type="text"
        className={styles.form__input}
        autoFocus={isFormHidden}
        placeholder={formType === 'add' ? '+ New item' : ''}
        {...register('itemValue', {
          onChange(e) { handleChange(e); },
          // onBlur() { handleBlur(); },
        })}
      />
      {isBtnVisible && <button type="submit" className={styles.form__submitBtn}>Add</button>}
    </form>
  );
};
