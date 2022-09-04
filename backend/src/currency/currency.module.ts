import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { currencyProviders } from './currency.providers';

@Module({
  providers: [CurrencyService, ...currencyProviders],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
