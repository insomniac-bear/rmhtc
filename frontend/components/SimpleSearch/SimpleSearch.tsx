import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SimpleSearch.module.css';
import { ISimpleSearch } from './SimpleSearch.props';

type FormData = {
  searchParams: string;
};

export const SimpleSearch: FC<ISimpleSearch> = ({ className, ...props }) => {
  const { handleSubmit, register } = useForm<FormData>();
  const submitFormHandler = (data: FormData) => {
    data.searchParams.toLowerCase();
  };

  return (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      className={`${styles.search} ${className}`}
      {...props}
    >
      <input
        className={styles.search__input}
        type="text"
        placeholder="Enter keywords"
        {...register('searchParams')}
      />
      <button
        type="submit"
        className={styles.search__button}
      >
        Search
      </button>
    </form>
  );
};
