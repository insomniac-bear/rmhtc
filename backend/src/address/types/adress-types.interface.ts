export type TAddressTypeValue = 'Legal' | 'Mailing' | 'Actual';

export interface IAddressType {
  uuid?: string;
  value: TAddressTypeValue;
};
