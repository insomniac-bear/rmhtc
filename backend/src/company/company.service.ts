import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { AddressService } from 'src/address/address.service';
import { AddressType } from 'src/address/entity/address-type.entity';
import { Address } from 'src/address/entity/address.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { ContactsService } from 'src/contacts/contacts.service';
import { ContactType } from 'src/contacts/entity/contact-type.entity';
import { Contact } from 'src/contacts/entity/contact.entity';
import {
  BUSINESS_TYPE_REPOSITORY,
  COMPANY_REPOSITORY,
  LEGAL_FORM_REPOSITORY,
} from 'src/core/constants';
import { MessengerType } from 'src/messengers/entity/messenger-type.entity';
import { Messenger } from 'src/messengers/entity/messenger.entity';
import { MessengersService } from 'src/messengers/messengers.service';
import { createCompanyDto } from './dto';
import { BusinessType } from './entity/business-type.entity';
import { Company } from './entity/company.entity';
import { LegalForm } from './entity/legal-form.entity';
import { IFullCompany } from './types';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyEntity: typeof Company,
    @Inject(LEGAL_FORM_REPOSITORY)
    private readonly legalFormEntity: typeof LegalForm,
    @Inject(BUSINESS_TYPE_REPOSITORY)
    private readonly businessTypeEntity: typeof BusinessType,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly addressService: AddressService,
    private readonly contactsService: ContactsService,
    private readonly messengersService: MessengersService
  ) {}

  async createCompany(companyName: string, userUuid: string): Promise<Company> {
    const company = await this.companyEntity.create({
      name: companyName,
      userUuid,
    });
    await this.addressService.createAddress(company.uuid);

    return company;
  }

  async getUsersCompanies(accessTokenPayload: JwtPayload, res) {
    const { sub, role, email } = accessTokenPayload;
    const companiesRawData = await this.companyEntity.findAll({
      where: {
        userUuid: sub,
      },
      include: [
        {
          model: Address,
          include: [
            {
              model: AddressType,
            },
          ],
        },
        {
          model: Contact,
          include: [
            {
              model: ContactType,
            },
          ],
        },
        {
          model: Messenger,
          include: [
            {
              model: MessengerType,
            },
          ],
        },
        {
          model: BusinessType,
        },
        {
          model: LegalForm,
        },
      ],
    });

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
      companies: companiesRawData.map((company) => createCompanyDto(company)),
    };
  }

  async getUsersCompanyCounts(userUuid) {
    const companyCount = await this.companyEntity.count({
      where: { userUuid },
    });
    const moderatedCompanyCount = await this.companyEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'success' }],
      },
    });
    const idleModerateCompanyCount = await this.companyEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'idle' }],
      },
    });
    const failedModerateCompanyCount = await this.companyEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'failed' }],
      },
    });

    return {
      companyCount,
      moderatedCompanyCount,
      idleModerateCompanyCount,
      failedModerateCompanyCount,
    };
  }

  async updateUsersCompany(
    rawCompanyData: IFullCompany,
    isModerate = false,
    res
  ) {
    const company = await this.companyEntity.findByPk(rawCompanyData.uuid);

    if (!company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    const legalForm = rawCompanyData.legalForm
      ? await this.legalFormEntity.findOne({
          where: { value: rawCompanyData.legalForm },
        })
      : null;
    const businessType = rawCompanyData.businessType
      ? await this.businessTypeEntity.findOne({
          where: { value: rawCompanyData.businessType },
        })
      : null;

    const companyData = createCompanyDto(rawCompanyData);
    if (isModerate) companyData.moderated = 'pending';

    await company.update({
      ...companyData,
      legalFormUuid: legalForm.uuid,
      businessTypeUuid: businessType.uuid,
    });

    return await company.get();
  }

  async updateCompanyData(companyData) {
    const company = await this.companyEntity.findByPk(companyData.uuid);

    if (!company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    await company.update({ ...companyData });
    return company;
  }

  async getCompaniesForModerate() {
    return await this.companyEntity.findAll({
      where: {
        moderated: 'pending',
      },
      include: [
        {
          model: Address,
          include: [
            {
              model: AddressType,
            },
          ],
        },
        {
          model: Contact,
          include: [
            {
              model: ContactType,
            },
          ],
        },
        {
          model: Messenger,
          include: [
            {
              model: MessengerType,
            },
          ],
        },
        {
          model: BusinessType,
        },
        {
          model: LegalForm,
        },
      ],
    });
  }
}
