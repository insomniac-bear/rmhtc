import { ApiProperty } from '@nestjs/swagger';
import { createAddressDto } from 'src/address/dto';
import { IAddress } from 'src/address/types';
import { createContactDto } from 'src/contacts/dto';
import { IContact } from 'src/contacts/types';
import { createMessengerDto } from 'src/messengers/dto';
import { IMessenger } from 'src/messengers/types';
import { TBudgetOfYear, TModerated, TQcEmployees } from '../types';

export class CompanyDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор компании',
  })
  readonly uuid?: string;

  @ApiProperty({
    example: 'Horn and Hoves',
    description: 'Название компании',
  })
  readonly name?: string;

  @ApiProperty({
    example:
      'https://s3.rmhtc.add.company/companyUuid/images/[hashed data of create].png',
    description: 'Ссылка на логотип компании',
  })
  readonly logoUrl?: string;

  @ApiProperty({
    example:
      'https://s3.rmhtc.add.company/companyUuid/images/[hashed data of create].pdf',
    description: 'Ссылка на презентацию компании',
  })
  readonly presentationUrl?: string;

  @ApiProperty({
    example: 'OGRN',
    description: 'Название идентификатора компании',
  })
  readonly regNumName?: string;

  @ApiProperty({
    example: '000000000',
    description: 'Регистрационный номер компании',
  })
  readonly regNumber?: string;

  @ApiProperty({
    example:
      'https://s3.rmhtc.add.company/companyUuid/regDoc/hashed-file-name.pdf',
    description: 'Ссылка на скан документа о регистрации компании',
  })
  readonly regDocUrl?: string;

  @ApiProperty({
    example: 'IFNS № 47',
    description: 'Наименование регистрирующего органа',
  })
  readonly issuingAuthority?: string;

  @ApiProperty({
    example: 'Some interesting description about company',
    description: 'Описание компании',
  })
  readonly description?: string;

  @ApiProperty({
    example: '2010',
    description: 'Год регистрации компании',
  })
  readonly yearOfFoundation?: number;

  @ApiProperty({
    example: 'http://www.company.com',
    description: 'Ссылка на сайт компании',
  })
  readonly website?: string;

  @ApiProperty({
    example: 'Boris Britva',
    description: 'ФИО директора компании',
  })
  ceo?: string;

  @ApiProperty({
    example: 'https://s3.rmhc.add.company/companyUuid/docs/ceo.pdf',
    description: 'Документ о назначении директора компании',
  })
  ceoDocUrl?: string;

  @ApiProperty({
    example: '0 - 50',
    description: 'Численность сотрудников компании',
  })
  qcEmployees?: TQcEmployees;

  @ApiProperty({
    example: '0 - 100 000',
    description: 'Годовой бюджет компании',
  })
  budgetOfYear?: TBudgetOfYear;

  @ApiProperty({
    example: 'RUR',
    description: 'Валюта бюджета',
  })
  currencyOfBudget?: string;

  @ApiProperty({
    example: 'idle',
    description: 'Статус модерации',
  })
  moderated?: TModerated;

  @ApiProperty({
    example: 'Manufacture',
    description: 'Тип компании',
  })
  businessType?: string;

  @ApiProperty({
    example: 'Limited Liability Company',
    description: 'Организационно-правовая форма',
  })
  legalForm?: string;

  @ApiProperty({
    example: 'LLC',
    description: 'Сокращенная организационно-правовая форма',
  })
  shortLegalForm?: string;

  @ApiProperty({
    description: 'Массив адресов компании',
  })
  addresses?: Array<IAddress>;

  @ApiProperty({
    description: 'Массив контактов компании',
  })
  contacts?: Array<IContact>;

  @ApiProperty({
    description: 'Массив мессенджеров компании',
  })
  messengers?: Array<IMessenger>;
}

export const createCompanyDto = (companyRawData, isCreatedData = false) => {
  return isCreatedData
    ? {
        uuid: companyRawData?.uuid,
        name: companyRawData?.name,
        logoUrl: companyRawData?.logoUrl,
        ceoDocUrl: companyRawData?.ceoDocUrl,
        presentationUrl: companyRawData?.presentationUrl,
        regNumber: companyRawData?.regNumber,
        regNumName: companyRawData?.regNumName,
        regDocUrl: companyRawData?.regDocUrl,
        issuingAuthority: companyRawData?.issuingAuthority,
        description: companyRawData?.description,
        yearOfFoundation: companyRawData?.yearOfFoundation,
        website: companyRawData?.website,
        ceo: companyRawData?.ceo,
        qcEmployees: companyRawData?.qcEmployees,
        budgetOfYear: companyRawData?.budgetOfYear,
        currencyOfBudget: companyRawData?.currencyOfBudget,
        legalForm: companyRawData?.legalForm?.value,
        shortLegalForm: companyRawData?.legalForm?.shortValue,
        businessType: companyRawData?.businessType?.value,
        moderated: companyRawData?.moderated,
        moderatedReason: companyRawData?.moderation?.reason,
        moderatedAuthorUuid: companyRawData?.moderation?.authorUuid,
        addresses: companyRawData?.addresses?.map((address) =>
          createAddressDto(address)
        ),
        contacts: companyRawData?.contacts?.map((contact) =>
          createContactDto(contact)
        ),
        messengers: companyRawData?.messengers?.map((messenger) =>
          createMessengerDto(messenger)
        ),
        createdAt: companyRawData?.createdAt,
      }
    : {
        uuid: companyRawData?.uuid,
        name: companyRawData?.name,
        logoUrl: companyRawData?.logoUrl,
        ceoDocUrl: companyRawData?.ceoDocUrl,
        presentationUrl: companyRawData?.presentationUrl,
        regNumber: companyRawData?.regNumber,
        regNumName: companyRawData?.regNumName,
        regDocUrl: companyRawData?.regDocUrl,
        issuingAuthority: companyRawData?.issuingAuthority,
        description: companyRawData?.description,
        yearOfFoundation: companyRawData?.yearOfFoundation,
        website: companyRawData?.website,
        ceo: companyRawData?.ceo,
        qcEmployees: companyRawData?.qcEmployees,
        budgetOfYear: companyRawData?.budgetOfYear,
        currencyOfBudget: companyRawData?.currencyOfBudget,
        legalForm: companyRawData?.legalForm?.value,
        shortLegalForm: companyRawData?.legalForm?.shortValue,
        businessType: companyRawData?.businessType?.value,
        moderated: companyRawData?.moderated,
        moderatedReason: companyRawData?.moderation?.reason,
        moderatedAuthorUuid: companyRawData?.moderation?.authorUuid,
        addresses: companyRawData?.addresses?.map((address) =>
          createAddressDto(address)
        ),
        contacts: companyRawData?.contacts?.map((contact) =>
          createContactDto(contact)
        ),
        messengers: companyRawData?.messengers?.map((messenger) =>
          createMessengerDto(messenger)
        ),
      };
};
