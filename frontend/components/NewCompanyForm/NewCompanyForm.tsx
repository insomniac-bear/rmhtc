/* eslint-disable no-shadow */
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Title } from '../Title/Title';
import { INewCompanyFormProps } from './NewCompanyForm.props';
import styles from './NewCompanyForm.module.css';
import { CustomInput } from '../CustomInput/CustomInput';
import { CustomTextarea } from '../CustomTextarea/CustomTextarea';
import { FileInput } from '../FileInput/FileInput';
import { Button } from '../Button/Button';

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
  link: string;
}

type TContact = {
  name: string;
  data: string;
}

type TRegistrationNumber = {
  name: string;
  number: string;
}

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
}

export const NewCompanyForm: FC<INewCompanyFormProps> = ({ className, ...props }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<TFormData>();

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

  const submitFormHandler = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitFormHandler)} className={`${styles.newCompanyForm} ${className}`} {...props}>
      <Title tag="h2" size="s">Basic information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Company name</p>
        <CustomInput className={styles.newCompanyForm__input} />
        <p className={styles.newCompanyForm__caption}>Description</p>
        <CustomTextarea placeholder="No more than 500 characters" className={styles.newCompanyForm__textarea} />
        <p className={styles.newCompanyForm__caption}>Link</p>
        <CustomInput className={styles.newCompanyForm__input} />
        <p className={styles.newCompanyForm__caption}>Head of company’s name</p>
        <CustomInput className={styles.newCompanyForm__input} />
        <p className={styles.newCompanyForm__caption}>Document confirming the authority of the head of company</p>
        <FileInput placeholder="PDF, JPG (no more than 100 Mb)" />
        <p className={styles.newCompanyForm__caption}>Company type</p>
        <Select
          instanceId="selectCompanyTypeBox"
          id="selectCompanyTypeBox"
          placeholder="-"
          options={options}
          styles={customSelectStyles}
        />
        <p className={styles.newCompanyForm__caption}>Logo</p>
        <FileInput className={styles.newCompanyForm__logoFileInput} placeholder="SVG (no more than 5 Mb)" />
      </fieldset>
      <Title tag="h2" size="s">Contact information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Legal address</p>
        <fieldset className={styles.newCompanyForm__addressFieldset}>
          <CustomInput placeholder="Country" className={styles.newCompanyForm__input} />
          <CustomInput placeholder="City" className={styles.newCompanyForm__input} />
          <CustomInput placeholder="Street" className={styles.newCompanyForm__input} />
          <CustomInput placeholder="House" className={styles.newCompanyForm__input} />
          <CustomInput placeholder="Post code" className={styles.newCompanyForm__input} />
          <CustomInput placeholder="Office" className={styles.newCompanyForm__input} />
        </fieldset>
        <p className={styles.newCompanyForm__caption}>Social networks</p>
        <CustomInput className={styles.newCompanyForm__input} />
        <p className={styles.newCompanyForm__caption}>Contacts</p>
        <CustomInput className={styles.newCompanyForm__input} />
      </fieldset>
      <Title tag="h2" size="s">Legal information</Title>
      <fieldset className={styles.newCompanyForm__fieldset}>
        <p className={styles.newCompanyForm__caption}>Legal form</p>
        <Select
          instanceId="selectLegalFormBox"
          id="selectLegalFormBox"
          placeholder="Choose one legal form"
          options={options}
          styles={customSelectStyles}
        />
        <p className={styles.newCompanyForm__caption}>Total number of employees</p>
        <Select
          instanceId="selectEmployeesBox"
          id="selectEmployeesBox"
          placeholder="-"
          options={options}
          styles={customSelectStyles}
        />
        <p className={styles.newCompanyForm__caption}>Annual turnover</p>
        <Select
          instanceId="selectAnnualTurnoverBox"
          id="selectAnnualTurnoverBox"
          placeholder="-"
          options={options}
          styles={customSelectStyles}
        />
        <p className={styles.newCompanyForm__caption}>Year of foundation of the company</p>
        <CustomInput className={styles.newCompanyForm__input} />
        <p className={styles.newCompanyForm__caption}>Registration document</p>
        <FileInput placeholder="PDF, JPG (no more than 100 Mb)" />
        <p className={styles.newCompanyForm__caption}>Registration number</p>
        <fieldset className={styles.newCompanyForm__regNumberFieldset}>
          <Select
            instanceId="selectAnnualTurnoverBox"
            id="selectAnnualTurnoverBox"
            placeholder="OGRN"
            options={options}
            styles={customSelectStyles}
          />
          <CustomInput className={styles.newCompanyForm__input} />
        </fieldset>
        <p className={styles.newCompanyForm__caption}>Registration authority</p>
        <CustomInput className={styles.newCompanyForm__input} />
      </fieldset>
      <div className={styles.newCompanyForm__buttons}>
        <Button type="button">Cancel</Button>
        <Button type="submit" appearance="primary">Save Data</Button>
      </div>
    </form>
  );
};
