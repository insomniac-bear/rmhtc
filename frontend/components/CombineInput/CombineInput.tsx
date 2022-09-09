import { useFieldArray } from 'react-hook-form';
import { CustomInput } from '../CustomInput/CustomInput';
import styles from './CombineInput.module.css';

export const CombineInput = ({
  firstPlaceholder, secondPlaceholder, control, name, maxFields, register, errors,
}:any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { maxLength: maxFields },
  });

  return (
    <div>
      <ul className={styles.combineInput__fields}>
        {fields.map((field, fieldIndex) => (
          <li key={field.id} className={styles.combineInput__fieldItem}>
            <CustomInput
              placeholder={firstPlaceholder}
              className={styles.combineInput__input}
              errors={errors[name] && errors[name][fieldIndex] && errors[name][fieldIndex].name}
              {...register(`${`${name}.${fieldIndex}`}.name`, {
                required: `${firstPlaceholder} is required`,
              })}
            />
            <CustomInput
              placeholder={secondPlaceholder}
              className={styles.combineInput__input}
              errors={errors[name] && errors[name][fieldIndex] && errors[name][fieldIndex].value}
              {...register(`${`${name}.${fieldIndex}`}.value`, {
                required: `${secondPlaceholder} is required`,
              })}
            />
            <button
              disabled={fields.length <= 1}
              aria-label="remove field"
              className={styles.combineInput__removeFieldBtn}
              type="button"
              onClick={() => remove(fieldIndex)}
            />
          </li>
        ))}
      </ul>
      <button
        disabled={fields.length >= maxFields}
        className={styles.combineInput__addFieldBtn}
        type="button"
        onClick={() => append({ name: '', value: '' })}
      >
        Add
      </button>
    </div>
  );
};
