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
import { User } from 'src/users/entity/user.entity';

@Table({
  tableName: 'email_tokens',
})
export class EmailToken extends Model {
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
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Токен подтверждения email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emailToken: string;

  @ForeignKey(() => User)
  userUuid: string;

  @BelongsTo(() => User)
  user: User;
}
