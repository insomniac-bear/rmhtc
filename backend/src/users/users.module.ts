import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { MinioClientModule } from 'src/core/minio-client/minio-client.module';
import { RolesModule } from 'src/roles/roles.module';
import { usersProviders } from './entity/user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  imports: [
    CompanyModule,
    RolesModule,
    forwardRef(() => AuthModule),
    MinioClientModule,
  ],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
