import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { offerProviders } from './offer.providers';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [OfferService, ...offerProviders],
  controllers: [OfferController],
  imports: [AuthModule, RolesModule],
})
export class OfferModule {}
