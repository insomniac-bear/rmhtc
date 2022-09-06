import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { Offer } from 'src/offer/entity/offer.entity';
import { Category } from './category.entity';

@Table({
  tableName: 'offers_categories',
})
export class OfferCategory extends Model<OfferCategory> {
  @ForeignKey(() => Offer)
  offerUuid: string;

  @ForeignKey(() => Category)
  typeUuid: string;
}
