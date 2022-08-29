import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

class UserDataDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  businessRole: string;
}

class CompanyDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class FinishRegistrationDto {
  @ApiProperty({
    example: {
      uuid: '2dfd7435-f7ce-4dd5-99d4-70e7ca3a849c',
      password: 'Very secret word',
      businessRole: 'Manager',
    },
  })
  @IsNotEmpty()
  @IsObject()
  userData: UserDataDto;
  @ApiProperty({
    example: {
      name: 'Horn and Hooves',
    },
  })
  @IsNotEmpty()
  @IsObject()
  companyData: CompanyDataDto;
}

export class ResponseFinishRegistration {
  @ApiProperty({
    example: 'success',
  })
  readonly status: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNmJmZTkwMi1kMTVmLTQwODAtYWFhNS05MTZkMGRlN2NmMDYiLCJlbWFpbCI6Imhjc29iQG1haWx0by5wbHVzIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NjE1MjQwMTMsImV4cCI6MTY2MTUyNDA3M30.bQPRoNo-C8Wq4jgAHcZwCkOD-KCDzKoDceknT9P5GJ0',
  })
  readonly accessToken: string;
  @ApiProperty({
    example: {
      uuid: 'f6bfe902-d15f-4080-aaa5-916d0de7cf06',
      email: 'example@example.com',
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
  readonly userData: {
    readonly uuid: string;
    readonly email: string;
    readonly emailVerified: boolean;
    readonly businessRole: string;
    readonly name: null;
    readonly surname: null;
    readonly avatarUrl: null;
    readonly role: 'USER';
    readonly counts: {
      readonly companyCount: number;
      readonly moderatedCompanyCount: number;
      readonly idleModerateCompanyCount: number;
      readonly failedModerateCompanyCount: number;
    };
  };
}
