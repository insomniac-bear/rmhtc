import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Company } from './company.entity';

@Table({
  tableName: 'legal_forms',
})
export class LegalForm extends Model<LegalForm> {
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
    example: 'Limited Liability Company',
    description: 'Полное название юридической формы',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  value: string;

  @ApiProperty({
    example: 'LLC',
    description: 'Сокращенное название юридической формы',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  shortValue: string;

  @HasMany(() => Company)
  companies: Company[];
}
