import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

class objectCountDto {
  @ApiProperty({
    description: 'Общее количество компаний',
  })
  companyCount?: number;
  @ApiProperty({
    description: 'Количество компаний, прошедших модерацию',
  })
  moderatedCompanyCount?: number;
  @ApiProperty({
    description: 'Количество компаний, ожидающих модерацию',
  })
  idleModerateCompanyCount?: number;
  @ApiProperty({
    description: 'Количество компаний, отклоненных с модерации',
  })
  failedModeratedCompanyCount?: number;

  @ApiProperty({
    description: 'Общее количество офферов созданных пользователем',
  })
  offerCount?: number;
  @ApiProperty({
    description: 'Количество офферов созданных пользователем, прошедших модерацию',
  })
  moderatedOfferCount?: number;
  @ApiProperty({
    description: 'Количество офферов созданных пользователем, ожидающих модерацию',
  })
  idleModerateOfferCount?: number;
  @ApiProperty({
    description: 'Количество офферов созданных пользователем, отклоненных с модерации',
  })
  failedModeratedOfferCount?: number;

  @ApiProperty({
    description: 'Общее количество запросов созданных пользователем',
  })
  requestCount?: number;
  @ApiProperty({
    description: 'Количество запросов созданных пользователем, прошедших модерацию',
  })
  moderatedRequestCount?: number;
  @ApiProperty({
    description: 'Количество запросов созданных пользователем, ожидающих модерацию',
  })
  idleModerateRequestCount?: number;
  @ApiProperty({
    description: 'Количество запросов созданных пользователем, отклоненных с модерации',
  })
  failedModeratedRequestCount?: number;

  @ApiProperty({
    description: 'Общее количество новостей',
  })
  newsCount?: number;
  @ApiProperty({
    description: 'Количество новостей созданных пользователем, прошедших модерацию',
  })
  moderatedNewsCount?: number;
  @ApiProperty({
    description: 'Количество новостей созданных пользователем, ожидающих модерацию',
  })
  idleModerateNewsCount?: number;
  @ApiProperty({
    description: 'Количество новостей созданных пользователем, отклоненных с модерации',
  })
  failedModeratedNewsCount?: number;
};

export class UserDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly uuid?: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Уникальный email',
  })
  readonly email?: string;

  @ApiProperty({
    example: 'top secret password',
    description: 'Пароль пользователя',
  })
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
  readonly businessRole?: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'Имя пользователя',
  })
  readonly name?: string;

  @ApiProperty({
    example: 'Drago',
    description: 'Фамилия пользователя',
  })
  readonly surname?: string;

  @ApiProperty({
    example: 'https://s3.rmhtc.add.company/users/2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c/avatars/avatar.jpg',
    description: 'Ссылка на аватар пользователя',
  })
  readonly avatarUrl?: string;

  @ApiProperty({
    example: 'USER',
    description: 'Роль пользователя в системе',
  })
  readonly role?: string;

  @ApiProperty({
    description: 'Количество объектов, созданных пользователем',
  })
  readonly counts?: objectCountDto;
}

export const dto = (userData: User, objectCount: objectCountDto): UserDto => {
  return {
    uuid: userData?.uuid,
    email: userData?.email,
    emailVerified: userData?.emailVerified,
    businessRole: userData?.businessRole,
    name: userData?.name,
    surname: userData?.surname,
    avatarUrl: userData?.avatarUrl,
    role: userData?.role?.name,
    counts: objectCount,
  }
}
