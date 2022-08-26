import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegistrationUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Email пользователя',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
