import Cookies from 'js-cookie';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setUser } from '../../services/slices/users';
import styles from './AvatarChangeForm.module.css';
import { userAPI } from '../../services/userService';
import { IAvatarChangeForm } from './AvatarChangeForm.props';

export const AvatarChangeForm: FC<IAvatarChangeForm> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const { register, handleSubmit } = useForm();
  const [updateAvatar] = userAPI.useUpdateAvatarMutation();

  const [avatarImage, setAvatarImage] = useState<any>(null);

  const handleSetAvatar = async (data: any) => {
    try {
      const newUserData: any = await updateAvatar(data.avatar[0]);

      dispatch(setUser(newUserData.data.userData));
      Cookies.set('accessToken', newUserData.data.accessToken);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) setAvatarImage(fileReader.result);
      };

      fileReader.readAsDataURL(data.avatar[0]);
    }
  };

  return (
    <form onChange={handleSubmit(handleSetAvatar)} className={`${styles.avatarChangeForm} ${className}`} {...props}>
      <input
        id="avatar"
        className={styles.avatarChangeForm__input}
        type="file"
        {...register('avatar')}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="avatar" className={styles.avatarChangeForm__label}>
        <div className={styles.avatarChangeForm__img}>
          <Image priority layout="fill" src={avatarImage || user.avatarUrl || '/profile-icon.svg'} />
        </div>
        <p className={styles.avatarChangeForm__caption}>Add photo</p>
      </label>
    </form>
  );
};
