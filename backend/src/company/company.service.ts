import { Injectable,Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { COMPANY_REPOSITORY } from 'src/core/constants';
import { Company } from './entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(@Inject(COMPANY_REPOSITORY) private readonly companyEntity: typeof Company,) {}

  async createCompany(companyName: string, userUuid: string): Promise<Company> {
    return await this.companyEntity.create({ name: companyName, userUuid });
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
