import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({
    example: 'Very secret phrase',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class ResponseLoginDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNmJmZTkwMi1kMTVmLTQwODAtYWFhNS05MTZkMGRlN2NmMDYiLCJlbWFpbCI6Imhjc29iQG1haWx0by5wbHVzIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NjE1NTI1MzgsImV4cCI6MTY2MTU1MjU5OH0.Rkdl-xwodw_J3mP8oCPGzi9DKyyBvgjO_pOrid6POR0',
  })
  accessToken: string;
  @ApiProperty({
    example: {
      uuid: 'f6bfe902-d15f-4080-aaa5-916d0de7cf06',
      email: 'hcsob@mailto.plus',
      emailVerified: true,
      businessRole: 'Manager',
      name: null,
      surname: null,
      avatarUrl: null,
      role: 'USER',
      counts: {
        companyCount: 1,
        moderatedCompanyCount: 0,
        idleModerateCompanyCount: 0,
        failedModerateCompanyCount: 0,
      },
    },
  })
  userData: {
    uuid: string;
    email: string;
    emailVerified: boolean;
    businessRole: string;
    name: string;
    surname: string;
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
