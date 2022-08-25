import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { ContactsController } from './contacts.controller';
import { contactsProvider } from './contacts.providers';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, ...contactsProvider],
  imports: [RolesModule, forwardRef(() => AuthModule)],
  exports: [ContactsService],
})
export class ContactsModule {}
