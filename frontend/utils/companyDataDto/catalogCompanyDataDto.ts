import { companyAddressDataDto } from '.';
import { ICompanyData } from '../../types';
import { findGeo } from '../utils';

export const catalogPreviewDataDto = (data: ICompanyData) => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  geo: findGeo(data?.addresses?.map((el) => companyAddressDataDto(el))),
});
