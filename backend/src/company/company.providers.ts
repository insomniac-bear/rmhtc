import { COMPANY_REPOSITORY } from "src/core/constants";
import { Company } from "./entity/company.entity";

export const companyProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
];
