import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDataDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор пользователя',
  })
  @IsUUID()
  readonly uuid?: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Уникальный email',
  })
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    example: 'top secret password',
    description: 'Пароль пользователя',
  })
  @IsString()
  readonly password?: string;

  @ApiProperty({
    example: 'true',
    description: 'Подтверждение email',
  })
  readonly emailVerified?: boolean;

  @ApiProperty({
    example: 'Manager',
    description: 'Роль пользователя в бизнесе',
  })
  @IsString()
  readonly businessRole?: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'Имя пользователя',
  })
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: 'Drago',
    description: 'Фамилия пользователя',
  })
  @IsString()
  readonly surname?: string;

  @ApiProperty({
    example:
      'https://s3.rmhtc.add.company/users/2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c/avatars/avatar.jpg',
    description: 'Ссылка на аватар пользователя',
  })
  @IsString()
  readonly avatarUrl?: string;
}
