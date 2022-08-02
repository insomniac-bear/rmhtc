import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Messenger } from './messenger.entity';

@Table({
  tableName: 'messenger_types',
})
export class MessengerType extends Model<MessengerType> {
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
    example: 'Email',
    description: 'Тип контакта компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  value: string;

  @HasMany(() => Messenger)
  messengers: Messenger[];
}
