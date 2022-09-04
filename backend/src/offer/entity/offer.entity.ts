import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/entity/category.entity';
import { OfferCategory } from 'src/category/entity/offer-category.entity';
import { TModerated } from 'src/company/types';
import { Currency } from 'src/currency/entity/currency.entity';
import { Moderation } from 'src/moderation/entity/moderation.entity';
import { Characteristic } from './characteristic.entity';
import { OfferPhoto } from './offer-photo.entity';
import { OfferType } from './offer-type.entity';

@Table({
  tableName: 'offers',
})
export class Offer extends Model<Offer> {
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
    example: 'Something product',
    description: 'Название оффера',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: false,
  })
  name: string;

  @ApiProperty({
    example: '500 - 10000',
    description: 'Стоимость оффера',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: false,
  })
  price: string;

  @ApiProperty({
    example: 'Price on request',
    description: 'Комментарий к цене оффера',
  })
  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    unique: false,
  })
  priceComment: string;

  @ApiProperty({
    example: 'Exclusive crocodile shoes',
    description: 'Описание товара не более 1000 символов',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
    unique: false,
  })
  description: string;

  @ApiProperty({
    example: 'idle',
    description: 'Статус модерации',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: 'idle',
    allowNull: false,
  })
  moderated: TModerated;

  @ForeignKey(() => Moderation)
  moderationUuid: string;

  @BelongsTo(() => Moderation)
  moderation: Moderation;

  @ForeignKey(() => Currency)
  currencyUuid: string;

  @BelongsTo(() => Currency)
  currencies: Currency;

  @ForeignKey(() => OfferType)
  offerTypeUuid: string;

  @BelongsTo(() => OfferType)
  offerTypes: OfferType;

  @HasMany(() => OfferPhoto)
  offerPhotos: OfferPhoto;

  @HasMany(() => Characteristic)
  characteristic: Characteristic;

  @BelongsToMany(() => Category, () => OfferCategory)
  categories: Category[];
}
