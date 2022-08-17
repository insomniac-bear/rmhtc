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

type TLegalAddress = {
  country: string;
  city: string;
  street: string;
  house: string;
  postCode: string;
  office: string;
};

type TSocial = {
  name: string;
  data: string;
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
  authDocument: File[];
  type: string;
  logo: File;
  legalAddress: TLegalAddress;
  socials: TSocial[];
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

  const defaultValues = {
    socials: [{}],
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

  const socialsOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedIn', label: 'LinkedIn' },
    { value: 'vk', label: 'VK' },
  ];

  const contactsOptions = [
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Telephone number' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'fax', label: 'Skype' },
    { value: 'zoom', label: 'Zoom' },
    { value: 'whatsApp', label: 'WhatsApp' },
  ];

  const legalFormsOptions = [
    { value: 'Limited Liability Company', label: 'Limited Liability Company' },
    { value: 'Limited trade development', label: 'Joint-stock company' },
    { value: 'Limited Liability Partnerships', label: 'Limited Liability Partnerships' },
    { value: 'Open Joint Stock Company', label: 'Open Joint Stock Company' },
    { value: 'Individual Entrepreneur ', label: 'Individual Entrepreneur ' },
    // { value: 'consumerCooperative', label: 'Consumer cooperative' },
    // { value: 'stateUnitaryEnterprise', label: 'State unitary enterprise' },
    // { value: 'municipalUnitaryEnterprise', label: 'Municipal unitary enterprise' },
    // { value: 'fund', label: 'Fund' },
  ];

  const companyTypeOptions = [
    { value: 'Manufacturer', label: 'Manufacturer' },
    { value: 'Wholesaler', label: 'Wholesaler' },
    { value: 'Reseller', label: 'Reseller' },
    { value: 'Dropshipper', label: 'Dropshipper' },
    { value: 'Trading Company', label: 'Trading Company' },
    { value: 'Buying Office', label: 'Buying Office' },
    { value: 'Agent', label: 'Agent' },
    { value: 'Association', label: 'Association' },
    { value: 'Government', label: 'Government' },
    { value: 'Business Service', label: 'Business Service' },
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
      businessType: data.type,
      legalForm: data.legalForm,
    };
    try {
      await updateCompany(preparedFormData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

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
          errors={errors.authDocument}
          accept="image/*,.pdf"
          {...register('authDocument', {
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
                options={companyTypeOptions}
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
          placeholder="SVG (no more than 5 Mb)"
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
          <CustomInput
            placeholder="Country"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.country}
            label="country"
            {...register('legalAddress.country', {
              // required: 'Country is required.',
            })}
          />
          <CustomInput
            placeholder="City"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.city}
            label="city"
            {...register('legalAddress.city', {
              // required: 'City is required.',
            })}
          />
          <CustomInput
            placeholder="Street"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.street}
            label="street"
            {...register('legalAddress.street', {
              // required: 'Street is required.',
            })}
          />
          <CustomInput
            placeholder="House"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.house}
            label="house"
            {...register('legalAddress.house', {
              // required: 'House is required.',
            })}
          />
          <CustomInput
            placeholder="Post code"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.postCode}
            label="postCode"
            {...register('legalAddress.postCode', {
              // required: 'Post code is required.',
            })}
          />
          <CustomInput
            placeholder="Office"
            className={styles.newCompanyForm__input}
            errors={errors.legalAddress?.office}
            label="office"
            {...register('legalAddress.office', {
              // required: 'Office is required.',
            })}
          />
        </fieldset>
        <p className={styles.newCompanyForm__caption}>Social networks</p>
        <CombineSelectInput
          {...{
            control, register, defaultValues: { ...defaultValues.socials }, getValues, setValue, errors,
          }}
          options={socialsOptions}
          selectPlaceholder="Socials"
          inputPlaceholder="URL/userlink"
          name="socials"
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
