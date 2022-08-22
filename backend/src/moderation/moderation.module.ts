import { Module } from '@nestjs/common';
import { moderationProviders } from './entity/moderation.providers';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';

@Module({
  controllers: [ModerationController],
  providers: [ModerationService, ...moderationProviders],
  exports: [ModerationService],
})
export class ModerationModule {}
