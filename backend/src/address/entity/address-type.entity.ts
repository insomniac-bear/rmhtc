import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from './address.entity';

@Table({
  tableName: 'address_types',
})
export class AddressType extends Model<AddressType> {
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
    example: 'Actual',
    description: 'Тип адреса',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  value: string;

  @HasMany(() => Address)
  users: Address[];
}
