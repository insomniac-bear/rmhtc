import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Offer } from './offer.entity';

@Table({
  tableName: 'offer_photos',
})
export class OfferPhoto extends Model<OfferPhoto> {
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
    example: 'http://s3.itc....',
    description: 'Ссылка на фото',
  })
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    unique: false,
  })
  url: string;

  @ApiProperty({
    example: 'Photo of product',
    description: 'Короткое описание фотографии',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: false,
  })
  description: string;

  @ForeignKey(() => Offer)
  offerUuid: string;
}
