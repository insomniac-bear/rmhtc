import { MODERATION_REPOSITORY } from 'src/core/constants';
import { Moderation } from './moderation.entity';

export const moderationProviders = [
  {
    provide: MODERATION_REPOSITORY,
    useValue: Moderation,
  },
];
