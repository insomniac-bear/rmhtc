import { ApiProperty } from '@nestjs/swagger';
import { IAddressType } from '../types';

export class AddressTypeDto {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор пользователя',
  })
  readonly uuid?: string;

  @ApiProperty({
    example: 'Actual | Legal | Post',
    description: 'Тип адресса',
  })
  readonly value?: string;
};