import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../company/entity/company.entity';
import { MessengerType } from './messenger-type.entity';

@Table({
  tableName: 'messengers',
})
export class Messenger extends Model<Messenger> {
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

  @ForeignKey(() => MessengerType)
  messengerTypeUuid: string;

  @BelongsTo(() => Company)
  companies: Company;

  @BelongsTo(() => MessengerType)
  messengerType: MessengerType;
}
