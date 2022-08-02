import { BUSINESS_TYPE_REPOSITORY, COMPANY_REPOSITORY, LEGAL_FORM_REPOSITORY } from "src/core/constants";
import { BusinessType } from "./entity/business-type.entity";
import { Company } from "./entity/company.entity";
import { LegalForm } from "./entity/legal-form.entity";

export const companyProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
  {
    provide: BUSINESS_TYPE_REPOSITORY,
    useValue: BusinessType,
  },
  {
    provide: LEGAL_FORM_REPOSITORY,
    useValue: LegalForm,
  },
];
