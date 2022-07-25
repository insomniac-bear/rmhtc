import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';
import { MailModule } from 'src/core/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { tokensProviders } from './entity/tokens.providers';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, ...tokensProviders],
  imports: [forwardRef(() => UsersModule), JwtModule, MailModule, CompanyModule],
  exports: [AuthService],
})
export class AuthModule {}
