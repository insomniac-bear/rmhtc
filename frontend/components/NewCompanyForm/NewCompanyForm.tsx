/* eslint-disable max-len */
/* eslint-disable no-shadow */
import { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Select, { SingleValue } from 'react-select';
import { Title } from '../Title/Title';
import { INewCompanyFormProps } from './NewCompanyForm.props';
import styles from './NewCompanyForm.module.css';
import { CustomInput } from '../CustomInput/CustomInput';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { FileInput } from '../FileInput/FileInput';
import { Button } from '../Button/Button';
import { CombineSelectInput } from '../CombineSelectInput/CombineSelectInput';
import { apiService } from '../../services/apiService';
import { userAPI } from '../../services/userService';
import { Loader } from '../Loader/Loader';

type TLegalAddress = {
  country: any;
  city: any;
  street: string;
  house: string;
  postCode: string;
  office: string;
};

type TMessenger = {
  type: string;
  value: string;
};

type TContact = {
  type: string;
  value: string;
};

type TRegistrationNumber = {
  name: string;
  number: string;
};

type TFormData = {
  name: string;
  description: string;
  link: string;
  head: string;
  authorityHead: File[];
  type: any;
  logo: File;
  legalAddress: TLegalAddress;
  messengers: TMessenger[];
  contacts: TContact[];
  legalForm: any;
  employees: any;
  annualTurnover: string;
  year: string;
  registrationDocument: File;
  registrationNumber: TRegistrationNumber;
  registrationAuthority: string;
  presentation: File;
};

export const NewCompanyForm: FC<INewCompanyFormProps> = ({ company, className, ...props }) => {
  const router = useRouter();
  const [moderateCompany] = userAPI.useEditCompanyMutation();
  const [saveCompany] = userAPI.useSaveCompanyDataMutation();
  const [updateCompanyAvatar] = userAPI.useUpdateCompanyAvatarMutation();
  const [updateCompanyPresentation] = userAPI.useUpdateCompanyPresentationMutation();
  const [updateCompanyCEO] = userAPI.useUpdateCompanyCEOMutation();
  const [updateCompanyRegistrationDocument] = userAPI.useUpdateCompanyRegistrationDocumentMutation();

  const { data: legalFormsQueryData, isFetching: isLegalFormsQueryFetching, isLoading: isLegalFormsQueryLoading } = apiService.useGetLegalFormsQuery('');
  const { data: businessTypesQueryData, isFetching: isBusinessTypesFetching, isLoading: isBusinessTypesLoading } = apiService.useGetBusinessTypesQuery('');
  const { data: countriesQueryData, isFetching: isCountriesFetching, isLoading: isCountriesLoading } = apiService.useGetCountriesQuery('');
  const { data: addressesTypesQueryData, isFetching: isAddressesTypesFetching, isLoading: isAddressesTypesLoading } = apiService.useGetAddressesTypesQuery('');
  const { data: citiesQueryData, isFetching: isCitiesFetching, isLoading: isCitiesLoading } = apiService.useGetCitiesQuery('');
  const { data: messengersQueryData, isFetching: isMessengersFetching, isLoading: isMessengersLoading } = apiService.useGetMessengersTypesQuery('');
  const { data: contactsQueryData, isFetching: isContactsFetching, isLoading: isContactsLoading } = apiService.useGetContactsTypesQuery('');

  const isDataFetching = isLegalFormsQueryFetching
  || isBusinessTypesFetching
  || isCountriesFetching
  || isAddressesTypesFetching
  || isCitiesFetching
  || isMessengersFetching
  || isContactsFetching;

  const isQueriesLoading = isLegalFormsQueryLoading
  || isBusinessTypesLoading
  || isCountriesLoading
  || isAddressesTypesLoading
  || isCitiesLoading
  || isMessengersLoading
  || isContactsLoading;

  const getOptionsFromQueryData = (queryData: any) => {
    if (queryData) {
      return queryData.map((option: any) => ({
        value: option.uuid,
        label: option.value,
      }));
    }
    return [];
  };

  const transferDataFromCombineSelectInput = (data: any, options: any) => {
    console.log(data);
    if (data[0].type) {
      return data.map((el: any) => {
        const currentOption = options.find((option: any) => el.type === option.label || el.type === option.value);
        return {
          type: currentOption.value,
          value: el.value,
        };
      });
    }
    return [];
  };

  const legalFormsOptions = getOptionsFromQueryData(legalFormsQueryData);
  const legalFormDefaultOption = legalFormsOptions.find((option: any) => option.label === company.legalForm);

  const businessTypesOptions = getOptionsFromQueryData(businessTypesQueryData);
  const businessTypeDefaultOption = businessTypesOptions.find((option: any) => option.label === company.businessType);

  const countriesOptions = getOptionsFromQueryData(countriesQueryData);
  const countryDefaultOption = countriesOptions.find((option: any) => option.label === company.addresses[0]?.country);

  const citiesOptions = getOptionsFromQueryData(citiesQueryData);
  const cityDefaultOption = citiesOptions.find((option: any) => option.label === company.addresses[0]?.city);

  const messengersOptions = getOptionsFromQueryData(messengersQueryData);
  const contactsOptions = getOptionsFromQueryData(contactsQueryData);

  const defaultValues = {
    messengers: company?.messengers.length ? company?.messengers : [{}],
    contacts: company?.contacts.length ? company : [{}],
    name: company?.name,
    description: company?.description,
    link: company?.website,
    head: company?.ceo,
    year: company?.yearOfFoundation,
    registrationAuthority: company?.issuingAuthority,
    legalForm: legalFormDefaultOption,
    type: businessTypeDefaultOption,
    employees: company?.qcEmployees,
    annualTurnover: company?.budgetOfYear,
    registrationNumber: {
      name: company?.regNumName,
      number: company?.regNumber,
    },
    legalAddress: {
      country: countryDefaultOption,
      city: cityDefaultOption,
      street: company?.addresses[0]?.street,
      house: company?.addresses[0]?.buildNum,
      postCode: company?.addresses[0]?.postCode,
      office: company?.addresses[0]?.roomNum,
    },
  };

  const {
    control, handleSubmit, register, formState: { errors }, getValues, setValue,
  } = useForm<TFormData>({
    defaultValues,
  });

  useEffect(() => {
    setValue('type', businessTypeDefaultOption);
    setValue('legalForm', legalFormDefaultOption);
    setValue('legalAddress.country', countryDefaultOption);
    setValue('legalAddress.city', cityDefaultOption);
  }, [businessTypeDefaultOption, cityDefaultOption, countryDefaultOption, legalFormDefaultOption, setValue]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const employeesOptions = [
    { value: '0 - 50', label: 'Up to 50' },
    { value: '50 - 100', label: 'From 50 to 100' },
    { value: '100+', label: 'More 100' },
  ];

  const defaultEmployeesOption = employeesOptions.find((option) => option.value === company?.qcEmployees);

  const annualTurnoverOptions = [
    { value: '0 - 100000', label: 'Up to 100000 million' },
    { value: '100000 - 1000000', label: 'From 100000 to 1 million' },
    { value: '1000000+', label: 'More 1 million' },
  ];

  const defaultAnnualTurnoverOption = annualTurnoverOptions.find((option) => option.value === company?.budgetOfYear);

  const regNumberOptions = [
    { value: 'inn', label: 'INN' },
    { value: 'ogrn', label: 'OGRN' },
  ];

  const defaultRegNumberOption = regNumberOptions.find((option) => option.value === company?.regNumName);

  const customSelectStyles: any = {
    valueContainer: (styles: any) => ({
      ...styles,
      padding: 0,
      cursor: 'pointer',
    }),
    container: (styles: any) => ({
      ...styles,
      marginBottom: '30px',
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

  const prepareFormData = (data: TFormData) => {
    const legalAddress = addressesTypesQueryData.find((el: any) => el.value === 'Legal');
    const preparedMessengersData = transferDataFromCombineSelectInput(data?.messengers, messengersOptions);
    const preparedContactsData = transferDataFromCombineSelectInput(data?.contacts, contactsOptions);
    const preparedFormData = {
      uuid: router.query.uuid,
      name: data?.name,
      regNumName: data.registrationNumber?.name,
      regNumber: data.registrationNumber.number,
      issuingAuthority: data.registrationAuthority,
      description: data.description,
      yearOfFoundation: data.year,
      website: data.link,
      ceo: data.head,
      qcEmployees: data.employees,
      budgetOfYear: data.annualTurnover,
      currencyOfBudget: 'RUB',
      businessTypeUuid: data.type?.value || data.type,
      legalFormUuid: data.legalForm?.value || data.legalForm,
      messengers: preparedMessengersData,
      contacts: preparedContactsData,
      addresses: [
        {
          addressTypeUuid: legalAddress.uuid,
          countryUuid: data.legalAddress.country?.value || data.legalAddress.country,
          cityUuid: data.legalAddress.city?.value || data.legalAddress.city,
          postCode: data.legalAddress.postCode,
          street: data.legalAddress.street,
          buildNum: data.legalAddress.house,
          roomNum: data.legalAddress.office,
        },
      ],
    };
    return preparedFormData;
  };

  const submitFormHandler = async (data: TFormData) => {
    const preparedDataToSend = prepareFormData(data);
    try {
      await moderateCompany(preparedDataToSend);
      router.back();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const saveFormHandler = async () => {
    const values = getValues();
    const preparedDataToSend = prepareFormData(values);
    try {
      await saveCompany(preparedDataToSend);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateCompanyAvatarHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      await updateCompanyAvatar({
        file,
        uuid: company.uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompanyPresentationHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      await updateCompanyPresentation({
        file,
        uuid: company.uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompanyCEOHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      await updateCompanyCEO({
        file,
        uuid: company.uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompanyRegistrationDocumentHandler = async (e: any) => {
    const file = e.target.files[0];
    try {
      await updateCompanyRegistrationDocument({
        file,
        uuid: company.uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isDataFetching || isQueriesLoading) return <Loader style={{ margin: '120px auto' }} />;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(submitFormHandler)} className={`${styles.newCompanyForm} ${className}`} {...props}>

      <Title tag="h2" size="s">Basic information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Company name</p>
        <CustomInput
          className={styles.newCompanyForm__input}
          errors={errors.name}
          label="name"
          {...register('name', {
            required: 'Company name is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Description</p>
        <CustomTextarea
          placeholder="No more than 500 characters"
          className={styles.newCompanyForm__textarea}
          errors={errors.description}
          label="description"
          {...register('description', {
            required: 'Description is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Link</p>
        <CustomInput
          className={styles.newCompanyForm__input}
          errors={errors.link}
          label="link"
          {...register('link', {
            required: 'Link is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Head of company’s name</p>
        <CustomInput
          className={styles.newCompanyForm__input}
          errors={errors.head}
          label="head"
          {...register('head', {
            required: 'Head of company’s name is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Document confirming the authority of the head of company</p>
        <FileInput
          placeholder="PDF, JPG (no more than 100 Mb)"
          errors={errors.authorityHead}
          accept="image/*,.pdf"
          {...register('authorityHead', {
            // required: 'Document to confirm is required.',
          })}
          onChange={updateCompanyCEOHandler}
        />
        <p className={styles.newCompanyForm__caption}>Presentation of company</p>
        <FileInput
          placeholder="PDF(no more than 100 Mb)"
          errors={errors.presentation}
          accept=".pdf"
          {...register('presentation', {
            // required: 'Document to confirm is required.',
          })}
          onChange={updateCompanyPresentationHandler}
        />
        <p className={styles.newCompanyForm__caption}>Company type</p>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className={styles.newCompanyForm__select}>
              <Select
                defaultValue={businessTypeDefaultOption}
                instanceId="selectCompanyTypeBox"
                id="selectCompanyTypeBox"
                placeholder="-"
                options={businessTypesOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={options.find((option) => option.value === value)}
              />
              {/* <p className={styles.newCompanyForm__error}>{errors.type ? errors.type.message : ''}</p> */}
            </div>
          )}
          {...register('type', {
            required: 'Type is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Logo</p>
        <FileInput
          className={styles.newCompanyForm__logoFileInput}
          placeholder="Image (no more than 5 Mb)"
          errors={errors.logo}
          accept="image/*"
          {...register('logo', {
            // required: 'Logo is required.',
          })}
          onChange={updateCompanyAvatarHandler}
        />
      </fieldset>

      <Title tag="h2" size="s">Contact information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Legal address</p>
        <fieldset className={styles.newCompanyForm__addressFieldset}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="legalAddress.country"
            render={({ field: { value, onChange } }) => (
              <Select
                defaultValue={countryDefaultOption}
                instanceId="selectLegalAddressCountryBox"
                id="selectLegalAddressCountryBox"
                placeholder="Countries"
                options={countriesOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={options.find((option) => option.value === value)}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="legalAddress.city"
            render={({ field: { value, onChange } }) => (
              <Select
                defaultValue={cityDefaultOption}
                instanceId="selectLegalAddressCityBox"
                id="selectLegalAddressCityBox"
                placeholder="City"
                options={citiesOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={options.find((option) => option.value === value)}
              />
            )}
          />
          <CustomInput
            placeholder="Street"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.street}
            label="street"
            {...register('legalAddress.street', {
              required: 'Street is required.',
            })}
          />
          <CustomInput
            placeholder="House"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.house}
            label="house"
            {...register('legalAddress.house', {
              required: 'House is required.',
            })}
          />
          <CustomInput
            placeholder="Post code"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.postCode}
            label="postCode"
            {...register('legalAddress.postCode', {
              required: 'Post code is required.',
            })}
          />
          <CustomInput
            placeholder="Office"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.office}
            label="office"
            {...register('legalAddress.office', {
              required: 'Office is required.',
            })}
          />
        </fieldset>
        <p className={styles.newCompanyForm__caption}>Social networks</p>
        <CombineSelectInput
          {...{
            control, register, defaultValues: { ...defaultValues?.messengers }, getValues, setValue, errors,
          }}
          options={messengersOptions}
          selectPlaceholder="Messenger"
          inputPlaceholder="URL/userlink"
          name="messengers"
          maxFields={3}
        />
        <p className={styles.newCompanyForm__caption}>Contacts</p>
        <CombineSelectInput
          {...{
            control, register, defaultValues: { ...defaultValues?.contacts }, getValues, setValue, errors,
          }}
          options={contactsOptions}
          selectPlaceholder="Contacts"
          inputPlaceholder="Contact"
          name="contacts"
          maxFields={3}
        />
      </fieldset>

      <Title tag="h2" size="s">Legal information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Legal form</p>
        <Controller
          control={control}
          rules={{ required: true }}
          name="legalForm"
          render={({ field: { value, onChange } }) => (
            <Select
              defaultValue={legalFormDefaultOption}
              instanceId="selectLegalFormBox"
              id="selectLegalFormBox"
              placeholder="Choose one legal form"
              options={legalFormsOptions}
              styles={customSelectStyles}
              onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
              value={options.find((option) => option.value === value)}
            />
          )}
        />
        <p className={styles.newCompanyForm__caption}>Total number of employees</p>
        <Controller
          control={control}
          rules={{ required: true }}
          name="employees"
          render={({ field: { value, onChange } }) => (
            <Select
              defaultValue={defaultEmployeesOption}
              instanceId="selectEmployeesBox"
              id="selectEmployeesBox"
              placeholder="-"
              options={employeesOptions}
              styles={customSelectStyles}
              onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
              value={options.find((option) => option.value === value)}
            />
          )}
        />
        <p className={styles.newCompanyForm__caption}>Annual turnover</p>
        <Controller
          control={control}
          rules={{ required: true }}
          name="annualTurnover"
          render={({ field: { value, onChange } }) => (
            <Select
              defaultValue={defaultAnnualTurnoverOption}
              instanceId="selectAnnualTurnoverBox"
              id="selectAnnualTurnoverBox"
              placeholder="-"
              options={annualTurnoverOptions}
              styles={customSelectStyles}
              onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
              value={options.find((option) => option.value === value)}
            />
          )}
        />

        <p className={styles.newCompanyForm__caption}>Year of foundation of the company</p>
        <CustomInput
          className={styles.newCompanyForm__input}
          errors={errors.year}
          label="year"
          {...register('year', {
            required: 'Year of foundation is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Registration document</p>
        <FileInput
          placeholder="PDF, JPG (no more than 100 Mb)"
          errors={errors.registrationDocument}
          accept="image/*,.pdf"
          {...register('registrationDocument', {
            // required: 'Registration document is required.',
          })}
          onChange={updateCompanyRegistrationDocumentHandler}
        />
        <p className={styles.newCompanyForm__caption}>Registration number</p>
        <fieldset className={styles.newCompanyForm__regNumberFieldset}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="registrationNumber.name"
            render={({ field: { value, onChange } }) => (
              <Select
                defaultValue={defaultRegNumberOption}
                instanceId="selectRegistrationNumberTypeBox"
                id="selectRegistrationNumberTypeBox"
                placeholder="OGRN"
                options={regNumberOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={options.find((option) => option.value === value)}
              />
            )}
          />
          <CustomInput
            className={styles.newCompanyForm__input}
            errors={errors.registrationNumber?.number}
            label="regNumber"
            {...register('registrationNumber.number', {
              required: 'Registration number is required.',
            })}
          />
        </fieldset>
        <p className={styles.newCompanyForm__caption}>Registration authority</p>
        <CustomInput
          className={styles.newCompanyForm__input}
          errors={errors.registrationAuthority}
          label="regAuthority"
          {...register('registrationAuthority', {
            required: 'Registration authority is required.',
          })}
        />
      </fieldset>
      <div className={styles.newCompanyForm__buttons}>
        <Button onClick={() => router.back()} type="button">Cancel</Button>
        <Button onClick={() => saveFormHandler()} type="button" appearance="primary">Save Data</Button>
        <Button type="submit" appearance="primary">Send to moderate</Button>
      </div>
    </form>
  );
};
