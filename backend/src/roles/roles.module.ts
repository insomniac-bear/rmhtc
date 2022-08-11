import { Module } from '@nestjs/common';
import { roleProviders } from './entity/roles.provider';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...roleProviders],
  exports: [RolesService],
})
export class RolesModule {}
