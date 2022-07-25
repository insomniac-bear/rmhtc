import { ApiProperty } from '@nestjs/swagger';
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
import { EmailToken } from 'src/auth/entity/email-token.entity';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Role } from 'src/roles/entity/roles.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
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
    example: 'example@example.com',
    description: 'Уникальный email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'true',
    description: 'Флаг подтверждение email',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailVerified: boolean;

  @ApiProperty({
    example: 'vErY_sEcReT_pAsSwOrD',
    description: 'Пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({
    example: 'Manager',
    description: 'Роль пользователя в компании',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  businessRole: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'Имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @ApiProperty({
    example: 'Drago',
    description: 'Фамилия пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname: string;

  @ApiProperty({
    example: 'https://s3.bucket.com/userUuid/avatar.jpg',
    description: 'Ссылка на аватар пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatarUrl: string;

  @ForeignKey(() => Role)
  roleUuid: string;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => EmailToken)
  emailToken: EmailToken;

  @HasOne(() => RefreshToken)
  refreshToken: RefreshToken;
}
