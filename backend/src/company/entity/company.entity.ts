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
import { User } from 'src/users/entity/user.entity';
import { moderatedT, qcEmployesT, budgetOfYearT } from '../interfaces/ICompanies';

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
    example: 'https://s3.rmhtc.add.company/companyUuid/docs/regDoc.pdf',
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
  qcEmployees: qcEmployesT;

  @ApiProperty({
    example: '0 - 100 000',
    description: 'Годовой бюджет компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  budgetOfYear: budgetOfYearT;

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
    type: DataType.BOOLEAN,
    defaultValue: 'idle',
    allowNull: false,
  })
  moderated: moderatedT;

  @ApiProperty({
    example: 'Failed documents',
    description: 'Причина отклонения с модерации',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  moderatedReason: string;

  @ForeignKey(() => User)
  userUuid: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Address)
  adressess: Address;
}
