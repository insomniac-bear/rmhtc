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
import { Offer } from './offer.entity';

@Table({
  tableName: 'characteristics',
})
export class Characteristic extends Model<Characteristic> {
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
    example: 'Weight',
    description: 'Название характеристики',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: false,
  })
  name: string;

  @ApiProperty({
    example: '500 mm',
    description: 'Значение характеристики',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: false,
  })
  value: string;

  @ForeignKey(() => Offer)
  offerUuid: string;

  @BelongsTo(() => Offer)
  offers: Offer;
}
