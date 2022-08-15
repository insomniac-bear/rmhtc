import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from '../entity/business-type.entity';
import { IBusinessType } from '../types';

export class BusinessTypeDocDescription {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор в БД',
  })
  readonly uuid: string;

  @ApiProperty({
    example: 'Manufacturer',
    description: 'Полное название типа бизнеса',
  })
  readonly value: string;
}

export const createBusinesTypeDto = (
  rawBusinesTypeData: BusinessType
): IBusinessType => {
  return {
    uuid: rawBusinesTypeData?.uuid,
    value: rawBusinesTypeData?.value,
  };
};
