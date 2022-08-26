import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @IsJWT()
  @IsNotEmpty()
  emailToken: string;
}

export class ResponseConfirmEmail {
  @ApiProperty({
    example: 'success',
  })
  readonly status: 'success';
  @ApiProperty({
    example: {
      uuid: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
      email: 'example@example.com',
      emailVerified: 'true',
      businessRole: 'null',
      name: 'null',
      surname: 'null',
      avatarUrl: 'null',
      role: 'USER',
      counts: {
        companyCount: '0',
        moderatedCompanyCount: '0',
        idleModerateCompanyCount: '0',
        failedModerateCompanyCount: '0',
      },
    },
  })
  readonly data: {
    uuid: string;
    email: string;
    emailVerified: boolean;
    businessRole: null;
    name: null;
    surname: null;
    avatarUrl: null;
    role: 'USER';
    counts: {
      companyCount: number;
      moderatedCompanyCount: number;
      idleModerateCompanyCount: number;
      failedModerateCompanyCount: number;
    };
  };
}
