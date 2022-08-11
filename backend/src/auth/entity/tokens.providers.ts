import {
  EMAIL_TOKEN_REPOSITORY,
  REFRESH_TOKEN_REPOSITORY,
} from 'src/core/constants';
import { EmailToken } from './email-token.entity';
import { RefreshToken } from './refresh-token.entity';

export const tokensProviders = [
  {
    provide: EMAIL_TOKEN_REPOSITORY,
    useValue: EmailToken,
  },
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useValue: RefreshToken,
  },
];
