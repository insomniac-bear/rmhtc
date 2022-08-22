import { ICompanyAddress } from '../../types';

export const companyAddressDataDto = (data: ICompanyAddress) => ({
  type: data?.addressType,
  address: {
    postCode: data?.postCode,
    country: data?.country,
    city: data?.city,
    street: data?.street,
    buildNum: data?.buildNum,
    roomNum: data?.roomNum,
  },
  value: Object.values(data).join(', ').replace(`, ${data?.addressType}`, ''),
  uuid: data?.uuid,
});
