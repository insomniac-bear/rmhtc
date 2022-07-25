import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseDto {
  @ApiProperty({
    example: 'success / failed / error',
    description: 'Статус успеха запроса',
  })
  readonly status?: 'success' | 'failed' | 'error';

  @ApiProperty({
    example: 'true',
    description: 'Подтверждение регистрации пользователя',
  })
  readonly data?: boolean;
}
