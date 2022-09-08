import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { offerProviders } from './offer.providers';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { categoryProviders } from 'src/category/category.providers';
import { ModerationModule } from 'src/moderation/moderation.module';

@Module({
  providers: [OfferService, ...offerProviders, ...categoryProviders],
  controllers: [OfferController],
  imports: [AuthModule, RolesModule, ModerationModule],
})
export class OfferModule {}
