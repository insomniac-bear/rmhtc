/* eslint-disable no-shadow */
import Select from 'react-select';
import { Button } from '../Button/Button';

import styles from './SearchBar.module.css';

export const SearchBar = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const customSelectStyles = {
    valueContainer: (styles: any) => ({
      ...styles,
      padding: 0,
      cursor: 'pointer',
    }),
    indicatorsContainer: () => ({

    }),
    indicatorContainer: (styles: any) => ({
      ...styles,
      padding: 0,
      BoxSizing: 'border-box',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      minWidth: '105px',
      display: 'flex',
      BoxSizing: 'border-box',
      padding: '2px 2px 2px 10px ',
      border: '1px solid #858383',
      borderRight: 'none',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontSize: 14,
      color: '#2B2B2B',
      fontFamily: 'ttnorms, arial, sans-serif',
    }),
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <fieldset className={styles.searchBar__fieldset}>
        <Select
          instanceId="selectbox"
          id="selectbox"
          isSearchable={false}
          options={options}
          placeholder="Category"
          styles={customSelectStyles}
        />
        <input
          className={styles.searchBar__input}
          placeholder="Enter keywords"
        />
      </fieldset>
      <Button type="submit" appearance="ghost">Search</Button>
    </form>
  );
};
