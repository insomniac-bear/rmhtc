import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOfferDto {
  @IsUUID()
  @IsNotEmpty()
  companyUuid: string;
  @IsString()
  name?: string;
  @IsString()
  price?: string;
  @IsString()
  amount?: string;
  @IsString()
  unit?: string;
  @IsString()
  description?: string;
  @IsString()
  currencyUuid?: string;
  @IsUUID()
  @IsString()
  offerTypeUuid?: string;
  categoryUuidList?: string[];
  characteristics?: Array<{ name: string; value: string }>;
}
