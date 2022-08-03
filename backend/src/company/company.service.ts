import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Op } from 'sequelize';
import { AddressService } from 'src/address/address.service';
import { AddressType } from 'src/address/entity/address-type.entity';
import { Address } from 'src/address/entity/address.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { COMPANY_REPOSITORY } from 'src/core/constants';
import { dto } from './dto/company.dto';
import { Company } from './entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyEntity: typeof Company,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly addressService: AddressService,
    ) {}

  async createCompany(companyName: string, userUuid: string): Promise<Company> {
    const company = await this.companyEntity.create({ name: companyName, userUuid });
    await this.addressService.createAddress(company.uuid);

    return company;
  }

  async getUsersCompanies(accessTokenPayload: JwtPayload, res) {
    const { sub, role, email } = accessTokenPayload;
    const companiesRawData = await this.companyEntity.findAll({
      where: {
        userUuid: sub
      },
      include: {
        model: Address,
        include: [
          {
            model: AddressType,
          }
        ]
      }
    });

    const { accessToken, refreshToken } = await this.authService.getTokens(sub, email, role);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
     companies: companiesRawData.map(company => dto(company)),
    }
  }

  async getUsersCompanyCounts(userUuid) {
    const companyCount = await this.companyEntity.count({ where: { userUuid } });
    const moderatedCompanyCount = await this.companyEntity.count({ where: {
      [Op.and]: [
        { userUuid },
        { moderated: 'success' },
      ],
    }});
    const idleModerateCompanyCount = await this.companyEntity.count({ where: {
      [Op.and]: [
        { userUuid },
        { moderated: 'idle' },
      ],
    }});
    const failedModerateCompanyCount = await this.companyEntity.count({ where: {
      [Op.and]: [
        { userUuid },
        { moderated: 'failed' },
      ],
    }});

    return {
      companyCount,
      moderatedCompanyCount,
      idleModerateCompanyCount,
      failedModerateCompanyCount,
    }
  }
}
