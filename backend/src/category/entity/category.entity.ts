import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Offer } from 'src/offer/entity/offer.entity';
import { OfferCategory } from './offer-category.entity';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
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
    example: 'Toys',
    description: 'Название категории',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Offer, () => OfferCategory)
  offers: Offer[];
}
