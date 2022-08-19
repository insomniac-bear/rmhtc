import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from 'src/address/entity/address.entity';
import { Contact } from 'src/contacts/entity/contact.entity';
import { Messenger } from 'src/messengers/entity/messenger.entity';
import { Moderation } from 'src/moderation/entity/moderation.entity';
import { User } from 'src/users/entity/user.entity';
import { TModerated, TQcEmployees, TBudgetOfYear } from '../types';
import { BusinessType } from './business-type.entity';
import { LegalForm } from './legal-form.entity';

@Table({
  tableName: 'companies',
})
export class Company extends Model<Company> {
  @ApiProperty({
    example: '7d199a4d-9d12-4459-bc8f-333a5803537f',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @ApiProperty({
    example: 'Horns and Hovers',
    description: 'Название компании',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'https://s3.rmhtc.add.company/companyUuid/image/companyUuid.jpg',
    description: 'Ссылка на логотип компании',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  logoUrl: string;

  @ApiProperty({
    example: 'OGRN',
    description: 'Название регистрационного номера компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  regNumName: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Регистрационный номер компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  regNumber: string;

  @ApiProperty({
    example:
      'https://s3.rmhtc.add.company/companyUuid/regDoc/hashed-file-name.pdf',
    description: 'Ссылка на документ, подтверждающий регистрацию компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  regDocUrl: string;

  @ApiProperty({
    example: 'IFNS № 47',
    description: 'Наименование регистрирующего органа',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  issuingAuthority: string;

  @ApiProperty({
    example: 'IT Integrator from Russia with Love',
    description: 'Описание компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '2010',
    description: 'Год регистрации компании',
  })
  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  yearOfFoundation: number;

  @ApiProperty({
    example: 'http://www.company.com',
    description: 'Ссылка на сайт компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website: string;

  @ApiProperty({
    example: 'Boris Britva',
    description: 'ФИО директора компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ceo: string;

  @ApiProperty({
    example: 'https://s3.rmhc.add.company/companyUuid/docs/ceo.pdf',
    description: 'Документ о назначении директора компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ceoDocUrl: string;

  @ApiProperty({
    example: '0 - 50',
    description: 'Численность сотрудников компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  qcEmployees: TQcEmployees;

  @ApiProperty({
    example: '0 - 100 000',
    description: 'Годовой бюджет компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  budgetOfYear: TBudgetOfYear;

  @ApiProperty({
    example: 'RUR',
    description: 'Валюта бюджета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currencyOfBudget: string;

  @ApiProperty({
    example: 'idle',
    description: 'Статус модерации',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: 'idle',
    allowNull: false,
  })
  moderated: TModerated;

  @ForeignKey(() => User)
  userUuid: string;

  @ForeignKey(() => BusinessType)
  businessTypeUuid: string;

  @ForeignKey(() => LegalForm)
  legalFormUuid: string;

  @ForeignKey(() => Moderation)
  moderationUuid: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => BusinessType)
  businessType: BusinessType;

  @BelongsTo(() => LegalForm)
  legalForm: LegalForm;

  @HasMany(() => Address)
  addresses: Address;

  @HasMany(() => Contact)
  contacts: Contact;

  @HasMany(() => Messenger)
  messengers: Messenger;

  @BelongsTo(() => Moderation)
  moderation: Moderation;
}
