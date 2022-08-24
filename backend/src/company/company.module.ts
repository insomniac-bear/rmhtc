import { Module, forwardRef } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.providers';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { MessengersModule } from 'src/messengers/messengers.module';
import { ModerationModule } from 'src/moderation/moderation.module';
import { MinioClientModule } from 'src/core/minio-client/minio-client.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
  imports: [
    forwardRef(() => AuthModule),
    AddressModule,
    ContactsModule,
    MessengersModule,
    ModerationModule,
    MinioClientModule,
  ],
  exports: [CompanyService, ...companyProviders],
})
export class CompanyModule {}
