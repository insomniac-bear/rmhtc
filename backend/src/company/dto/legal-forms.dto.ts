import { ApiProperty } from '@nestjs/swagger';
import { LegalForm } from '../entity/legal-form.entity';
import { ILegalForm } from '../types';

export class LegalFormDocDescription {
  @ApiProperty({
    example: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
    description: 'Уникальный идентификатор в БД',
  })
  readonly uuid: string;

  @ApiProperty({
    example: 'Limited trade development',
    description: 'Полное название юридической формы',
  })
  readonly value: string;

  @ApiProperty({
    example: 'LTD',
    description: 'Сокращенное название юридической формы',
  })
  readonly shortValue: string;
}

export const createLegalFormsDto = (
  rawLegalFormData: LegalForm
): ILegalForm => {
  return {
    uuid: rawLegalFormData?.uuid,
    value: rawLegalFormData?.value,
    shortValue: rawLegalFormData?.shortValue,
  };
};
