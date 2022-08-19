import { Address } from '../entity/address.entity';
import { IAddress } from '../types/adress.interface';

export const createAddressDto = (addressRawData: Address): IAddress => {
  return {
    uuid: addressRawData?.uuid,
    postCode: addressRawData?.postCode,
    street: addressRawData?.street,
    buildNum: addressRawData?.buildNum,
    roomNum: addressRawData?.roomNum,
    addressType: addressRawData?.addressTypes?.value,
    country: addressRawData?.countries?.value,
    city: addressRawData?.cities?.value,
  };
};
