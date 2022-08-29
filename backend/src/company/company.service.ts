import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { AddressService } from 'src/address/address.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { ContactsService } from 'src/contacts/contacts.service';
import {
  BUSINESS_TYPE_REPOSITORY,
  COMPANY_REPOSITORY,
  LEGAL_FORM_REPOSITORY,
} from 'src/core/constants';
import { MinioClientService } from 'src/core/minio-client/minio-client.service';
import { BufferedFile } from 'src/core/minio-client/types/minio.interface';
import { MessengersService } from 'src/messengers/messengers.service';
import { ModerationService } from 'src/moderation/moderation.service';
import {
  createCompanyDto,
  createBusinessTypeDto,
  createLegalFormsDto,
} from './dto';
import { BusinessType } from './entity/business-type.entity';
import { Company } from './entity/company.entity';
import { LegalForm } from './entity/legal-form.entity';
import { allFields } from './entity/query-options';
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
    private readonly messengersService: MessengersService,
    private readonly moderationService: ModerationService,
    private readonly minioClientService: MinioClientService
  ) {}

  /**
   * Функции пользователя
   */
  async createCompany(companyName: string, userUuid: string): Promise<Company> {
    const moderationNote = await this.moderationService.createModerationNote();
    const company = await this.companyEntity.create({
      name: companyName,
      moderationUuid: moderationNote.uuid,
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
      include: allFields,
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

  async getUserCompany(companyUuid) {
    return await this.companyEntity.findOne({
      where: {
        uuid: companyUuid,
      },
      include: allFields,
    });
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
        [Op.and]: [{ userUuid }, { moderated: 'pending' }],
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

  async uploadFile(
    jwtTokenPayload: JwtPayload,
    res,
    query: { uuid: string },
    file: BufferedFile,
    type: string
  ) {
    const { sub, email, role } = jwtTokenPayload;

    if (file.size > 3145728) {
      console.log(file.size);
      throw new HttpException(
        'Uploading file to very large',
        HttpStatus.BAD_REQUEST
      );
    }

    const { uuid } = query;
    const company = await this.getUserCompany(uuid);
    if (!company) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    if (company[type]) {
      const pathArr = company[type].split('/');
      const objectName = pathArr[pathArr.length - 1];
      await this.minioClientService.delete(`companies/${uuid}/`, objectName);
    }

    const fileUrl = await this.minioClientService.upload(
      `companies/${uuid}/`,
      file
    );

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    const updatedCompany = await company.update({ [type]: fileUrl });

    await this.authService.saveRefreshToken(sub, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      userData: createCompanyDto(updatedCompany),
    };
  }

  async updateUsersCompany(
    accessTokenPayload: JwtPayload,
    rawCompanyData: IFullCompany,
    isModerate = false,
    res
  ) {
    const { sub, role, email } = accessTokenPayload;
    const company = await this.companyEntity.findByPk(rawCompanyData.uuid);

    if (!company)
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    const legalForm = rawCompanyData.legalFormUuid
      ? await this.legalFormEntity.findByPk(rawCompanyData.legalFormUuid)
      : null;
    const businessType = rawCompanyData.businessTypeUuid
      ? await this.businessTypeEntity.findByPk(rawCompanyData.businessTypeUuid)
      : null;

    const listOfAddressPromise =
      rawCompanyData?.addresses?.length > 0
        ? rawCompanyData.addresses.map((address) =>
            this.addressService.createOrUpdateAddress(company.uuid, address)
          )
        : [];

    const listOfContactsPromise =
      rawCompanyData?.contacts?.length > 0
        ? rawCompanyData.contacts.map((contact) =>
            this.contactsService.createContact(
              contact.type,
              contact.value,
              company.uuid
            )
          )
        : [];

    const listOfMessengerPromise =
      rawCompanyData?.messengers?.length > 0
        ? rawCompanyData.messengers.map((messenger) =>
            this.messengersService.createMessenger(
              messenger.type,
              messenger.value,
              company.uuid
            )
          )
        : [];

    if (listOfAddressPromise.length > 0) {
      await Promise.all(listOfAddressPromise);
    }

    if (listOfContactsPromise.length > 0) {
      await Promise.all(listOfContactsPromise);
    }

    if (listOfMessengerPromise.length > 0) {
      await Promise.all(listOfMessengerPromise);
    }

    const companyData = createCompanyDto(rawCompanyData);
    companyData.moderated = isModerate ? 'pending' : 'idle';

    await company.update({
      ...companyData,
      legalFormUuid: legalForm.uuid,
      businessTypeUuid: businessType.uuid,
    });

    const updatedCompany = await this.getUserCompany(company.uuid);

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
      company: createCompanyDto(updatedCompany),
    };
  }

  /**
   * Функции модерирования
   */
  async getCompaniesForModerate(accessTokenPayload: JwtPayload, res, query) {
    const { sub, role, email } = accessTokenPayload;

    const limit = 6;
    const page = query.page ? query.page - 1 : 0;

    const companies = await this.companyEntity.findAndCountAll({
      where: {
        moderated: {
          [Op.or]: ['pending', 'process'],
        },
      },
      include: allFields,
      distinct: true,
      offset: page * limit,
      limit,
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
      companies: companies.rows.map((company) => {
        return createCompanyDto(company, true);
      }),
      count: companies.count,
    };
  }

  async getCompanyForModerate(accessTokenPayload: JwtPayload, res, uuid) {
    const { sub, role, email } = accessTokenPayload;

    const company = await this.companyEntity.findOne({
      where: {
        [Op.and]: [
          uuid,
          {
            moderated: {
              [Op.or]: ['pending', 'process'],
            },
          },
        ],
      },
      include: allFields,
    });

    if (
      company.moderation.authorUuid &&
      company.moderation.authorUuid !== sub &&
      company.moderated === 'process'
    ) {
      throw new HttpException(
        'Company already moderating',
        HttpStatus.FORBIDDEN
      );
    }

    company.moderated = 'process';
    await company.save();

    await this.moderationService.updateModerationNote(
      company.moderationUuid,
      null,
      sub
    );

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
      company: createCompanyDto(company, false),
    };
  }

  async declineCompanyFromModerate(
    accessTokenPayload: JwtPayload,
    res,
    data,
    query
  ) {
    const { sub, role, email } = accessTokenPayload;

    const company = await this.companyEntity.findByPk(query.uuid);

    if (!company) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    await company.update({
      moderated: 'failed',
    });

    await this.moderationService.updateModerationNote(
      company.moderationUuid,
      data.reason,
      sub
    );

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
    };
  }

  async moderateCompany(
    accessTokenPayload: JwtPayload,
    res,
    data: {
      status: 'failed' | 'success';
      reason: string;
    },
    query
  ) {
    const { sub, role, email } = accessTokenPayload;

    const company = await this.companyEntity.findByPk(query.uuid);

    if (!company) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    await company.update({
      moderated: data.status,
    });

    await this.moderationService.updateModerationNote(
      company.moderationUuid,
      data.reason,
      sub
    );

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
    };
  }

  async getLegalForms() {
    const rawLegalFormsData = await this.legalFormEntity.findAll();
    return rawLegalFormsData.map((rawLegalForm) =>
      createLegalFormsDto(rawLegalForm)
    );
  }

  async getBusinessTypes() {
    const rawBusinessTypesData = await this.businessTypeEntity.findAll();
    return rawBusinessTypesData.map((rawBusinessType) =>
      createBusinessTypeDto(rawBusinessType)
    );
  }

  /**
   * Общие функции
   */
  async getApproveCompanies(query) {
    const limit = 9;
    const page = query.page ? query.page - 1 : 0;

    const companies = await this.companyEntity.findAndCountAll({
      where: {
        moderated: 'success',
      },
      include: allFields,
      distinct: true,
      offset: page * limit,
      limit,
    });

    return {
      status: 'success',
      companies: companies.rows.map((company) => {
        return createCompanyDto(company, true);
      }),
      count: companies.count,
    };
  }

  async getCompany(uuid: string) {
    const company = await this.companyEntity.findByPk(uuid);
    return {
      status: 'success',
      company: createCompanyDto(company, false),
    };
  }
}
