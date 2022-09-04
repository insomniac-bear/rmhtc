import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { offerProviders } from './offer.providers';

@Module({
  providers: [OfferService, ...offerProviders],
  controllers: [OfferController],
})
export class OfferModule {}
