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
import { Company } from 'src/company/entity/company.entity';
import { AddressType } from './address-type.entity';
import { City } from './city.entity';
import { Country } from './country.entity';

@Table({
  tableName: 'addresses',
})
export class Address extends Model<Address> {
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
    example: '1234567',
    description: 'Почтовый индекс',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  postCode: string;

  @ApiProperty({
    example: 'Red Square',
    description: 'Название улицы',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  street: string;

  @ApiProperty({
    example: '11B',
    description: 'Номер дома',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  buildNum: string;

  @ApiProperty({
    example: '1-A',
    description: 'Номер офиса',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: false,
  })
  roomNum: string;

  @ForeignKey(() => Company)
  companyUuid: string;

  @ForeignKey(() => AddressType)
  addressTypeUuid: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  countryUuid: string;

  @ForeignKey(() => City)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cityUuid: string;

  @BelongsTo(() => Company)
  companies: Company;

  @BelongsTo(() => AddressType)
  addressTypes: AddressType;

  @BelongsTo(() => Country)
  countries: Country;

  @BelongsTo(() => City)
  cities: City;
}
