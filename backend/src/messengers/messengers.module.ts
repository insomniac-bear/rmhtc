import { Module } from '@nestjs/common';
import { MessengersController } from './messengers.controller';
import { messengersProvider } from './messengers.provider';
import { MessengersService } from './messengers.service';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService, ...messengersProvider],
  exports: [MessengersService, ...messengersProvider],
})
export class MessengersModule {}
