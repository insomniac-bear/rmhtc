import { TNewAddress } from '../types';

export const findGeo = (arr: TNewAddress[]): string | null => {
  const current = arr?.find((el: any) => el.addressType === 'Legal' || 'Actual' || 'Mailing');
  if (typeof current !== 'undefined') {
    return `${current.address.country}, ${current.address.city}`;
  }
  return null;
};
