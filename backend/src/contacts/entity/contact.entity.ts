import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../company/entity/company.entity';
import { ContactType } from './contact-type.entity';

@Table({
  tableName: 'contacts',
})
export class Contact extends Model<Contact> {
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
    example: 'example@example.com',
    description: 'Контакт компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  value: string;

  @ForeignKey(() => Company)
  companyUuid: string;

  @ForeignKey(() => ContactType)
  contactTypeUuid: string;

  @BelongsTo(() => Company)
  companies: Company;

  @BelongsTo(() => ContactType)
  contactType: ContactType;
}
