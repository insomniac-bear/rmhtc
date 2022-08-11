import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { contactsProvider } from './contacts.providers';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, ...contactsProvider],
  exports: [ContactsService],
})
export class ContactsModule {}
