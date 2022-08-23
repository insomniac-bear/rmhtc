/* eslint-disable no-shadow */
import { FC } from 'react';
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
import { userAPI } from '../../services/userService';
import { Loader } from '../Loader/Loader';

type TLegalAddress = {
  country: string;
  city: string;
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
  name: string;
  data: string;
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
  type: string;
  logo: File;
  legalAddress: TLegalAddress;
  messengers: TMessenger[];
  contacts: TContact[];
  legalForm: string;
  employees: string;
  annualTurnover: string;
  year: number;
  registrationDocument: File;
  registrationNumber: TRegistrationNumber;
  registrationAuthority: string;
};

export const NewCompanyForm: FC<INewCompanyFormProps> = ({ company = {}, className, ...props }) => {
  const router = useRouter();
  const [updateCompany] = userAPI.useEditCompanyMutation();

  const { data: legalFormsQueryData, isLoading: isGetLegalFormsLoading } = userAPI.useGetLegalFormsQuery('');
  const { data: businessTypesQueryData } = userAPI.useGetBusinessTypesQuery('');
  const { data: countriesQueryData } = userAPI.useGetCountriesQuery('');
  const { data: citiesQueryData } = userAPI.useGetCitiesQuery('');
  const { data: messengersQueryData } = userAPI.useGetMessengersTypesQuery('');
  const { data: contactsQueryData } = userAPI.useGetContactsTypesQuery('');

  const getOptionsFromQueryData = (queryData: any) => {
    if (queryData) {
      return queryData.map((option: any) => ({
        value: option.uuid,
        label: option.value,
      }));
    }
    return [];
  };

  const legalFormsOptions = getOptionsFromQueryData(legalFormsQueryData);
  const businessTypesOptions = getOptionsFromQueryData(businessTypesQueryData);
  const countriesOptions = getOptionsFromQueryData(countriesQueryData);
  const citiesOptions = getOptionsFromQueryData(citiesQueryData);
  const messengersOptions = getOptionsFromQueryData(messengersQueryData);
  const contactsOptions = getOptionsFromQueryData(contactsQueryData);

  const defaultValues = {
    messengers: [{}],
    contacts: [{}],
    name: company.name,
  };

  const {
    control, handleSubmit, register, formState: { errors }, getValues, setValue,
  } = useForm<TFormData>({
    defaultValues,
  });

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

  const annualTurnoverOptions = [
    { value: '0 - 100000', label: 'Up to 100000 million' },
    { value: '100000 - 1000000', label: 'From 100000 to 1 million' },
    { value: '1000000+', label: 'More 1 million' },
  ];

  const regNumberOptions = [
    { value: 'inn', label: 'INN' },
    { value: 'ogrn', label: 'OGRN' },
  ];

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

  const submitFormHandler = async (data: TFormData) => {
    const preparedFormData = {
      authorityHead: data.authorityHead,
      uuid: router.query.uuid,
      name: data.name,
      logoUrl: null,
      regNumName: data.registrationNumber.name,
      regNumber: data.registrationNumber.number,
      regDocUrl: null,
      issuingAuthority: data.registrationAuthority,
      description: data.description,
      yearOfFoundation: data.year,
      website: data.link,
      ceo: data.head,
      ceoDocUrl: null,
      qcEmployees: data.employees,
      budgetOfYear: data.annualTurnover,
      currencyOfBudget: 'RUB',
      businessTypeUuid: data.type,
      legalFormUuid: data.legalForm,
      messengers: data.messengers,
      contacts: data.contacts,
      addresses: [
        {
          addressTypeUuid: '1a277000-eac1-44aa-9f1e-9b5a8b7e4ece',
          countryUuid: 'b918f47e-2041-47b8-a62c-0c551e1d6cd9',
          cityUuid: '1dd0189c-15f9-41d2-afba-8d503a750baa',
          postCode: data.legalAddress.postCode,
          street: data.legalAddress.street,
          buildNum: data.legalAddress.house,
          roomNum: data.legalAddress.office,
        },
      ],
    };

    try {
      await updateCompany(preparedFormData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  if (isGetLegalFormsLoading) return <Loader />;

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
          multiple
          placeholder="PDF, JPG (no more than 100 Mb)"
          errors={errors.authorityHead}
          accept="image/*,.pdf"
          {...register('authorityHead', {
            // required: 'Document to confirm is required.',
          })}
        />
        <p className={styles.newCompanyForm__caption}>Company type</p>
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className={styles.newCompanyForm__select}>
              <Select
                instanceId="selectCompanyTypeBox"
                id="selectCompanyTypeBox"
                placeholder="-"
                options={businessTypesOptions}
                styles={customSelectStyles}
                onChange={(val: SingleValue<{ value: string; label: string; }>) => onChange(val?.value)}
                value={options.find((option) => option.value === value)}
              />
              <p className={styles.newCompanyForm__error}>{errors.type ? errors.type.message : ''}</p>
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
            control, register, defaultValues: { ...defaultValues.messengers }, getValues, setValue, errors,
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
            control, register, defaultValues: { ...defaultValues.contacts }, getValues, setValue, errors,
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
        />
        <p className={styles.newCompanyForm__caption}>Registration number</p>
        <fieldset className={styles.newCompanyForm__regNumberFieldset}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="registrationNumber.name"
            render={({ field: { value, onChange } }) => (
              <Select
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
        <Button type="button">Cancel</Button>
        <Button type="submit" appearance="primary">Save Data</Button>
      </div>
    </form>
  );
};
