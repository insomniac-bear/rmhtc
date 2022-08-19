import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './core/mail/mail.module';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';
import { MinioClientModule } from './core/minio-client/minio-client.module';
import { MessengersModule } from './messengers/messengers.module';
import { ContactsModule } from './contacts/contacts.module';
import { ModerationModule } from './moderation/moderation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    MailModule,
    CompanyModule,
    AddressModule,
    MinioClientModule,
    MessengersModule,
    ContactsModule,
    ModerationModule,
  ],
})
export class AppModule {}
