import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Offer } from './offer.entity';

@Table({
  tableName: 'offer_types',
})
export class OfferType extends Model<OfferType> {
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
    example: 'Product',
    description: 'Тип оффера',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: false,
  })
  value: string;

  @HasMany(() => Offer)
  offers: Offer;
}
