import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Offer } from 'src/offer/entity/offer.entity';

@Table({
  tableName: 'currencies',
})
export class Currency extends Model<Currency> {
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
    example: 'RUR',
    description: 'Международное обозначение валюты',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: false,
  })
  name: string;

  @HasMany(() => Offer)
  offers: Offer;
}
