/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-autofocus */
import {
  ChangeEvent,
  FC,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { adminAPI } from '../../../../services/adminService';
import styles from './EditForm.module.css';
import { IEditForm } from './EditForm.props';
import check from '../../../../images/check-mark-green.svg';
import cross from '../../../../images/cross-icon-red.svg';

type FormData = {
  itemValue: string;
};

export const EditForm: FC<IEditForm> = ({
  isFormHidden,
  formType,
  item,
  hideForm,
  fetchParams,
  className,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isBtnsVisible, setIsBtnsVisible] = useState(true);
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      itemValue: item?.value,
    },
  });
  const [patchItem] = adminAPI.usePatchDirectoryItemMutation();
  const [postItem] = adminAPI.usePostNewDirectoryItemMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== item?.value) setIsBtnsVisible(false);
    if (e.target.value === item?.value) setIsBtnsVisible(true);
    if (formType === 'add' && e.target.value !== '') setIsBtnsVisible(false);
    if (formType === 'add' && e.target.value === '') setIsBtnsVisible(true);
  };

  const handleCancel = () => {
    if (hideForm) {
      hideForm();
    } else {
      setIsBtnsVisible(true);
      formRef?.current?.reset();
    }
  };

  const submitFormHandler = async (data: FormData) => {
    const value = data.itemValue;

    if (formType === 'patch') {
      patchItem({
        route: fetchParams.route, type: fetchParams.type, uuid: item!.uuid, value,
      }).finally(() => {
        if (hideForm) {
          hideForm();
        } else {
          setIsBtnsVisible(true);
          formRef?.current?.reset();
        }
      });
    }

    if (formType === 'add') {
      postItem({
        route: fetchParams.route, type: fetchParams.type, value,
      }).finally(() => {
        if (hideForm) {
          hideForm();
        } else {
          setIsBtnsVisible(true);
          formRef?.current?.reset();
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      ref={formRef}
      className={`${styles.form} ${className}`}
      {...props}
    >
      <input
        type="text"
        className={styles.form__input}
        autoFocus={isFormHidden}
        placeholder={formType === 'add' ? '+ New item' : ''}
        {...register('itemValue', {
          onChange(e) { handleChange(e); },
        })}
      />
      {!isBtnsVisible && (
        <div className={styles.form__controls}>
          <button type="submit" className={styles.form__btn}><Image src={check} alt="Ok" /></button>
          <button type="button" onClick={handleCancel} className={styles.form__btn}><Image src={cross} alt="Cancel" /></button>
        </div>
      )}
    </form>
  );
};
