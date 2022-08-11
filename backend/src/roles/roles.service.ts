import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'src/core/constants';
import { Role } from './entity/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleEntity: typeof Role
  ) {}

  async getRoleByValue(name: string): Promise<Role> {
    return await this.roleEntity.findOne({ where: { name } });
  }
}
