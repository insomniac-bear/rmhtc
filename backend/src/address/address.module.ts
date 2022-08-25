import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { AddressController } from './address.controller';
import { addressProviders } from './address.providers';
import { AddressService } from './address.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, ...addressProviders],
  imports: [RolesModule, forwardRef(() => AuthModule)],
  exports: [AddressService],
})
export class AddressModule {}
