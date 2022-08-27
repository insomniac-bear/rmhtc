import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogoutDto {
  @ApiProperty({
    example: 'success',
  })
  status: string;
}
