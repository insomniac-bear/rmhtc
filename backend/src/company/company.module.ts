import { Module, forwardRef } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.providers';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
  imports: [forwardRef(() => AuthModule), AddressModule],
  exports: [CompanyService, ...companyProviders]
})
export class CompanyModule {}
