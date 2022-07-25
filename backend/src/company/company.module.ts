import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.providers';

@Module({
  providers: [CompanyService, ...companyProviders],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
