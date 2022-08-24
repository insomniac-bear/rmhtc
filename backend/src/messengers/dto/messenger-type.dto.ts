import { ApiProperty } from '@nestjs/swagger';
import { MessengerType } from '../entity/messenger-type.entity';

export class MessengerTypeDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор компании',
  })
  readonly uuid: string;
  @ApiProperty({
    example: 'telegram',
    description: 'Название типа мессенджера',
  })
  readonly value: string;
  @ApiProperty({
    example: '2022-08-23T23:12:41.145Z',
    description: 'Дата создания',
  })
  readonly createdAt?: string;
  @ApiProperty({
    example: '2022-08-23T23:12:41.145Z',
    description: 'Дата обновления',
  })
  readonly updatedAt?: string;
}

export class CreateTypeDto {
  @ApiProperty({
    example: 'telegram',
    description: 'Название типа контакта',
  })
  readonly value: string;
}

export class UpdateTypeDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор в БД',
  })
  readonly uuid: string;
  @ApiProperty({
    example: 'telegram',
    description: 'Название обновленного типа контакта',
  })
  readonly value: string;
}

export const createMessengerTypeDto = (
  rawData: MessengerType
): MessengerTypeDto => {
  return {
    uuid: rawData.uuid,
    value: rawData.value,
  };
};
