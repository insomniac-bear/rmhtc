import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
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
    private readonly contactTypeRepository: typeof ContactType,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
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

  async createContactType(
    accessTokenPayload: JwtPayload,
    res,
    value: string
  ): Promise<{
    status: string;
    accessToken: string;
    types: IContactType[];
  }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.contactTypeRepository.findOne({
      where: {
        value,
      },
    });

    if (candidate) {
      throw new HttpException(
        `Contact type ${value} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.contactTypeRepository.create({ value });
    const types = await this.contactTypeRepository.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }

  async updateContactType(
    accessTokenPayload: JwtPayload,
    res,
    uuid: string,
    value: string
  ): Promise<{ status: string; accessToken: string; types: IContactType[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.contactTypeRepository.findByPk(uuid);

    if (!candidate) {
      throw new HttpException(
        'Type of contact not found',
        HttpStatus.NOT_FOUND
      );
    }

    const candidateType = await this.contactTypeRepository.findOne({
      where: {
        value,
      },
    });

    if (candidateType) {
      throw new HttpException(
        `${value} type already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await candidate.update({ value });

    const types = await this.contactTypeRepository.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }
}
