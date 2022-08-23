/* eslint-disable no-shadow */
import { Controller, useFieldArray } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import { CustomInput } from '../CustomInput/CustomInput';
import styles from './CombineSelectInput.module.css';

export const CombineSelectInput = ({
  options, selectPlaceholder, inputPlaceholder, control, name, maxFields, register, errors,
}:any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const customSelectStyles: any = {
    valueContainer: (styles: any) => ({
      ...styles,
      padding: 0,
      cursor: 'pointer',
    }),
    container: (styles: any) => ({
      ...styles,
      marginBottom: '5px',
    }),
    control: () => ({
      minWidth: '105px',
      height: '40px',
      display: 'flex',
      BoxSizing: 'border-box',
      padding: '2px 2px 2px 10px ',
      border: '1px solid #D5D4D4',
      borderRadius: 5,
      backgroundColor: '#FEFEFE',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontSize: 14,
      color: '#858383',
      fontFamily: 'ttnorms, arial, sans-serif',
    }),
  };

  return (
    <div>
      <ul className={styles.combineSelectInput__fields}>
        {fields.map((field, fieldIndex) => (
          <li key={field.id} className={styles.combineSelectInput__fieldItem}>
            <Controller
              control={control}
              name={`${name}Select${fieldIndex}`}
              {...register(`${`${name}.${fieldIndex}`}.type`, {
                // required: `Select ${name}`,
              })}
              render={({ field: { value, onChange } }) => (
                <div>
                  <Select
                    instanceId={`${name}SelectFormBox${fieldIndex}`}
                    id={`${name}SelectFormBox${fieldIndex}`}
                    placeholder={selectPlaceholder}
                    options={options}
                    styles={customSelectStyles}
                    onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                    value={options.find((option: any) => option.value === value)}
                  />
                  {/* <p className={styles.combineSelectInput__error}>{errors[name] ? errors[name][0].name.message : ''}</p> */}
                </div>
              )}
            />
            <CustomInput
              placeholder={inputPlaceholder}
              className={styles.combineSelectInput__input}
              errors={errors[name] && errors[name][0].data}
              {...register(`${`${name}.${fieldIndex}`}.value`, {
                // required: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
              })}
            />
            <button
              disabled={fields.length <= 1}
              aria-label="remove field"
              className={styles.combineSelectInput__removeFieldBtn}
              type="button"
              onClick={() => remove(fieldIndex)}
            />
          </li>
        ))}
      </ul>
      <button
        disabled={fields.length >= maxFields}
        className={styles.combineSelectInput__addFieldBtn}
        type="button"
        onClick={() => append({ type: '', value: '' })}
      >
        Add
      </button>
    </div>
  );
};
