import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { addressProviders } from './address.providers';
import { AddressService } from './address.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, ...addressProviders],
  exports: [AddressService]
})
export class AddressModule {}
