import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  CONTACT_REPOSITORY,
  CONTACT_TYPE_REPOSITORY,
} from 'src/core/constants';
import { createContactTypeDto } from './dto';
import { ContactType } from './entity/contact-type.entity';
import { Contact } from './entity/contact.entity';
import { IContactType } from './types/contact-type.interface';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: typeof Contact,
    @Inject(CONTACT_TYPE_REPOSITORY)
    private readonly contactTypeRepository: typeof ContactType
  ) {}

  async getAllContactTypes(): Promise<IContactType[]> {
    const rawContactTypes = await this.contactTypeRepository.findAll();
    const contactTypes = rawContactTypes.map((contactType) =>
      createContactTypeDto(contactType)
    );
    return contactTypes;
  }

  async getCompanyContacts(companyUuid: string): Promise<Contact[]> {
    const contacts = await this.contactRepository.findAll({
      where: { companyUuid },
    });
    return contacts;
  }

  async createContact(
    contactTypeUuid: string,
    contactValue: string,
    companyUuid: string
  ): Promise<Contact> {
    const typeOfContact = await this.contactTypeRepository.findByPk(
      contactTypeUuid
    );

    if (!typeOfContact) {
      throw new HttpException(
        'Not found type of contact',
        HttpStatus.NOT_FOUND
      );
    }

    const existContact = await this.contactRepository.findOne({
      where: {
        value: contactValue,
      },
    });

    existContact
      ? await existContact.update({
          contactTypeUuid,
          value: contactValue,
          companyUuid,
        })
      : await this.contactRepository.create({
          contactTypeUuid,
          value: contactValue,
          companyUuid,
        });

    return this.contactRepository.findOne({
      where: {
        contactTypeUuid,
        companyUuid,
      },
    });
  }
}
