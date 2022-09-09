/* eslint-disable no-shadow */
import { FC } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { Title } from '../Title/Title';
import { INewOfferProps } from './NewOfferForm.props';
import styles from './NewOfferForm.module.css';
import { CustomInput } from '../CustomInput/CustomInput';
import { FileInput } from '../FileInput/FileInput';
import { apiService } from '../../services/apiService';
import { Loader } from '../Loader/Loader';
import { userAPI } from '../../services/userService';
import { CombineInput } from '../CombineInput/CombineInput';

type TSelectOption = {
  value: string,
  label: string,
}

type TOfferPrice = {
  currency: TSelectOption,
  sum: string,
  amount: string,
  unit: string,
}

type TCharacteristic = {
  name: string,
  value: string,
}

type TFormData = {
  company: any,
  offerName: string,
  offerType: string,
  offerCategories: any,
  price: TOfferPrice,
  priceComment: string,
  description: string,
  presentation: File,
  characteristics: TCharacteristic[],
  photos: File[]
};

export const NewOfferForm: FC<INewOfferProps> = ({ className, ...props }) => {
  const [createOffer] = userAPI.useCreateOfferMutation();
  const {
    data: offerCategoriesQueryData,
    isFetching: isOfferCategoriesQueryFetching,
    isLoading: isOfferCategoriesQueryLoading,
  } = apiService.useGetOffersCategoriesQuery('');

  const {
    data: offerCurrenciesQueryData,
    isFetching: isOfferCurrenciesQueryFetching,
    isLoading: isOfferCurrenciesQueryLoading,
  } = apiService.useGetCurrenciesQuery('');

  const {
    data: offerTypesQueryData,
    isFetching: isOfferTypesQueryFetching,
    isLoading: isOfferTypesQueryLoading,
  } = apiService.useGetOfferTypesQuery('');

  const {
    data: userCompaniesQueryData,
  } = userAPI.useGetUserCompaniesQuery('');

  const isDataFetching = isOfferCategoriesQueryFetching
  || isOfferCurrenciesQueryFetching
  || isOfferTypesQueryFetching;

  const isQueriesLoading = isOfferCategoriesQueryLoading
  || isOfferCurrenciesQueryLoading
  || isOfferTypesQueryLoading;

  const getOptionsFromQueryData = (queryData: []): { value: string, label: string }[] => {
    if (queryData) {
      return queryData.map((option: any) => ({
        value: option.uuid,
        label: option.value,
      }));
    }
    return [];
  };

  const getCompaniesOptionsFromQueryData = (queryData: []): { value: string, label: string }[] => {
    if (queryData) {
      return queryData.map((company: any) => ({
        value: company.uuid,
        label: company.name,
      }));
    }
    return [];
  };

  const prepareFormData = (data: TFormData) => ({
    name: data.offerName,
    priceComment: data.priceComment,
    description: data.description,
    currencyUuid: data.price.currency.value,
    price: data.price.sum,
    companyUuid: data.company,
    offerTypeUuid: data.offerType,
    characteristics: data.characteristics,
    categoryUuidList: data.offerCategories.map((category: any) => category.value),
  });

  const offerCategoriesOptions = getOptionsFromQueryData(offerCategoriesQueryData);
  const offerCurrenciesOptions = getOptionsFromQueryData(offerCurrenciesQueryData);

  const companiesOptions = getCompaniesOptionsFromQueryData(userCompaniesQueryData);

  const customSelectStyles = {
    container: (styles: any) => ({
      ...styles,
      marginBottom: '30px',
    }),
    control: (styles: any) => ({
      ...styles,
      minHeight: '40px',
    }),
  };

  const {
    handleSubmit, control, register, formState: { errors }, getValues, setValue,
  } = useForm<TFormData>({
    defaultValues: {
      offerCategories: [],
      characteristics: [{}],
    },
  });

  const defaultValues = {
    characteristics: [{}],
  };

  const handleFormSubmit = (data: TFormData) => {
    const actualData = prepareFormData(data);
    console.log(actualData);
    createOffer(actualData);
  };

  if (isDataFetching || isQueriesLoading) return <Loader style={{ margin: '120px auto' }} />;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`${styles.newOfferForm} ${className}`} {...props}>
      <div className={styles.newOfferForm__head}>
        <Title tag="h2" size="s">Offer information</Title>
        <Button type="button">Save Data</Button>
      </div>
      <fieldset className={styles.newOfferForm__fieldset}>
        <p className={styles.newOfferForm__caption}>Publishing company</p>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className={styles.newOfferForm__select}>
              <Select
                instanceId="selectCompanyBox"
                id="selectCompanyBox"
                placeholder="Choose publishing company"
                options={companiesOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={companiesOptions.find((option: any) => option.value === value)}
              />
              {/* <p className={styles.newOfferForm__error}>{errors.type ? errors.type.message : ''}</p> */}
            </div>
          )}
          {...register('company', {

          })}
        />
        <p className={styles.newOfferForm__caption}>Offer name</p>
        <CustomInput
          placeholder="Enter offer name"
          errors={errors.offerName}
          label="offerName"
          className={styles.newOfferForm__input}
          {...register('offerName', {
            required: 'Offer name is required.',
          })}
        />
        <p className={styles.newOfferForm__caption}>Offer type</p>
        <ul className={styles.newOfferForm__types}>
          {offerTypesQueryData.map((offerType: any) => (
            <li>
              <label className={styles.newOfferForm__typesLabel} htmlFor={offerType.uuid}>
                <input {...register('offerType')} type="radio" value={offerType.uuid} id={offerType.uuid} />
                <p className={styles.newOfferForm__typesTitle}>{offerType.value}</p>
              </label>
            </li>
          ))}
        </ul>
        <p className={styles.newOfferForm__caption}>Category</p>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className={styles.newOfferForm__select}>
              <Select
                isMulti
                instanceId="selectCategoriesBox"
                id="selectCategoriesBox"
                placeholder="Choose categories (no more 5)"
                options={getValues().offerCategories.length <= 4 ? offerCategoriesOptions : []}
                styles={customSelectStyles}
                onChange={(val: MultiValue<{ value: string; label: string; }>) => onChange(val)}
                value={offerCategoriesOptions.find((option: any) => option.value === value)}
              />
              {/* <p className={styles.newOfferForm__error}>{errors.type ? errors.type.message : ''}</p> */}
            </div>
          )}
          {...register('offerCategories', {

          })}
        />
        <p className={styles.newOfferForm__caption}>Price</p>
        <div className={styles.newOfferForm__priceFields}>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className={styles.newOfferForm__select}>
                <Select
                  instanceId="selectCurrenciesBox"
                  id="selectCurrenciesBox"
                  placeholder="Currency"
                  options={offerCurrenciesOptions}
                  styles={customSelectStyles}
                  onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val)}
                  value={offerCurrenciesOptions.find((option: any) => option.value === value)}
                />
                {/* <p className={styles.newOfferForm__error}>{errors.type ? errors.type.message : ''}</p> */}
              </div>
            )}
            {...register('price.currency', {

            })}
          />
          <CustomInput
            type="number"
            placeholder="Sum (speсific or range)"
            errors={errors.price?.sum}
            className={styles.newOfferForm__input}
            {...register('price.sum', {
              required: 'Sum is required.',
            })}
          />
          <CustomInput
            placeholder="Amount"
            errors={errors.price?.amount}
            className={styles.newOfferForm__input}
            {...register('price.amount', {
              required: 'Amount is required.',
            })}
          />
          <CustomInput
            placeholder="Unit"
            errors={errors.price?.unit}
            className={styles.newOfferForm__input}
            {...register('price.unit', {
              required: 'Price unit is required',
            })}
          />
        </div>
        <p className={styles.newOfferForm__caption}>Price comment</p>
        <CustomTextarea
          placeholder="No more than 500 symbols"
          className={styles.newOfferForm__textarea}
          errors={errors.priceComment}
          label="priceComment"
          {...register('priceComment', {
            required: 'Price comment is required.',
          })}
        />
        <p className={styles.newOfferForm__caption}>Description</p>
        <CustomTextarea
          placeholder="No more than 500 symbols"
          className={styles.newOfferForm__textarea}
          errors={errors.description}
          label="description"
          {...register('description', {
            required: 'Description is required.',
          })}
        />
        <p className={styles.newOfferForm__caption}>Presentation</p>
        <FileInput
          className={styles.newOfferForm__fileInput}
          placeholder="Upload Presentation"
        />
        <p className={styles.newOfferForm__caption}>Characteristics</p>
        <CombineInput
          {...{
            control, register, defaultValues: { ...defaultValues.characteristics }, getValues, setValue, errors,
          }}
          name="characteristics"
          maxFields={5}
          firstPlaceholder="Characteristic name"
          secondPlaceholder="Characteristic value"
        />
        {/* <p className={styles.newOfferForm__caption}>Photo (no more than 5 pieces)</p>
        <div>
          <input multiple type="file" />
        </div> */}
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};
