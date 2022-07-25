import { Controller } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import styles from './CustomSelect.module.css';

export const CustomSelect = ({
  errors, control, options, register, placeholder, name, instanceId, id,
}: any) => {
  const customSelectStyles = {};
  return (
    <Controller
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className={styles.customSelect__select}>
          <Select
            instanceId={instanceId}
            id={id}
            placeholder={placeholder}
            options={options}
            styles={customSelectStyles}
            onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
            value={options.find((option: any) => option.value === value)}
          />
          <p className={styles.customSelect__error}>{errors ? errors.message : ''}</p>
        </div>
      )}
      {...register(name, {
        required: `Select ${name} is required.`,
      })}
    />
  );
};
