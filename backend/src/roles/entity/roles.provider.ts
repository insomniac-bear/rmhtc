import { ROLE_REPOSITORY } from 'src/core/constants';
import { Role } from './roles.entity';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];
