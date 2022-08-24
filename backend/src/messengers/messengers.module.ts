import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { MessengersController } from './messengers.controller';
import { messengersProvider } from './messengers.provider';
import { MessengersService } from './messengers.service';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService, ...messengersProvider],
  imports: [RolesModule, forwardRef(() => AuthModule)],
  exports: [MessengersService, ...messengersProvider],
})
export class MessengersModule {}
