import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { currencyProviders } from './currency.providers';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [CurrencyService, ...currencyProviders],
  controllers: [CurrencyController],
  imports: [AuthModule, RolesModule],
})
export class CurrencyModule {}
