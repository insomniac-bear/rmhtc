import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { Button } from '../Button/Button';
import { CustomInput } from '../CustomInput/CustomInput';
import { Title } from '../Title/Title';
import { INameChangeFormProps } from './NameChangeForm.props';
import styles from './NameChangeForm.module.css';
import { userAPI } from '../../services/userService';
import { setUser } from '../../services/slices/users';

type FormData = {
  name: string;
  surname: string;
}

export const NameChangeForm: FC<INameChangeFormProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((store) => store.user.user);
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: user.name || 'First name',
      surname: user.surname || 'Last name',
    },
  });
  const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation();

  const submitFormHandler = async (data: FormData) => {
    try {
      const newUserData: any = await updateUser(data);
      dispatch(setUser(newUserData.data.user));
    } catch (error: any) {
      throw new Error(error);
    }

    router.back();
  };

  return (
    <form className={styles.nameChangeForm} onSubmit={handleSubmit(submitFormHandler)}>
      <Title className={styles.nameChangeForm__title} tag="h3" size="s">Name change</Title>
      <fieldset className={styles.nameChangeForm__fieldset}>
        <div className={styles.nameChangeForm__field}>
          <p className={styles.nameChangeForm__caption}>First name</p>
          <CustomInput
            placeholder="First name"
            errors={errors.name}
            {...register('name', {
              required: 'First name is required.',
            })}
          />
        </div>
        <div className={styles.nameChangeForm__field}>
          <p className={styles.nameChangeForm__caption}>Last name</p>
          <CustomInput
            placeholder="Last name"
            errors={errors.name}
            {...register('surname', {
              required: 'Last name is required.',
            })}
          />
        </div>
      </fieldset>
      <div className={styles.nameChangeForm__buttons}>
        <Button className={styles.nameChangeForm__button} disabled={isLoading} type="submit" appearance="primary">Save</Button>
        <Button className={styles.nameChangeForm__button} onClick={() => router.back()} type="button" appearance="ghost">Cancel</Button>
      </div>
    </form>
  );
};
