import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';
import { MailModule } from 'src/core/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { tokensProviders } from './entity/tokens.providers';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...tokensProviders],
  imports: [forwardRef(() => UsersModule), CompanyModule, JwtModule, MailModule, CompanyModule],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
