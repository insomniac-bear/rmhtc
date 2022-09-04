import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/entity/company.entity';
import { Offer } from 'src/offer/entity/offer.entity';
import { User } from 'src/users/entity/user.entity';

@Table({
  tableName: 'moderation',
})
export class Moderation extends Model<Moderation> {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  reason: string;

  @ForeignKey(() => User)
  authorUuid: string;

  @BelongsTo(() => User)
  users: User;

  @HasOne(() => Company)
  companies: Company;

  @HasOne(() => Offer)
  offers: Offer;
}
