import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CompanyModule } from 'src/company/company.module';
import { RolesModule } from 'src/roles/roles.module';
import { usersProviders } from './entity/user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  imports: [CompanyModule, RolesModule, forwardRef(() => AuthModule)],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
