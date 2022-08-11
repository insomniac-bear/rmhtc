import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  ADDRESS_TYPE_REPOSITORY,
  CITY_REPOSITORY,
  COUNTRY_REPOSITORY,
} from 'src/core/constants';
import { AddressTypeDto } from './dto';
import { AddressType } from './entity/address-type.entity';
import { Address } from './entity/address.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressEntity: typeof Address,
    @Inject(ADDRESS_TYPE_REPOSITORY)
    private readonly addressTypeEntity: typeof AddressType,
    @Inject(COUNTRY_REPOSITORY) private readonly countryEntity: typeof Country,
    @Inject(CITY_REPOSITORY) private readonly cityEntity: typeof City
  ) {}

  async createAddress(addressData) {
    const { companyUuid, addressType = 'Actual' } = addressData;
    const foundAddressType = await this.getAddressTypeByParam(
      'value',
      addressType
    );
    const newAddress = {
      companyUuid,
      addressTypeUuid: foundAddressType.uuid,
    };
    return await this.addressEntity.create<Address>(newAddress);
  }

  async getAllAddressTypes() {
    const addressTypes = await this.addressTypeEntity.findAll();

    if (!addressTypes)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return addressTypes;
  }

  async getAllCountries() {
    const countries = await this.countryEntity.findAll();

    if (!!countries) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return countries;
  }

  async getAllCities() {
    const cities = await this.cityEntity.findAll();

    if (!!cities) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return cities;
  }

  async getAddressTypeByParam(
    param: string,
    value: string
  ): Promise<AddressTypeDto> {
    const addressType =
      param === 'uuid'
        ? await this.addressTypeEntity.findByPk(value)
        : await this.addressTypeEntity.findOne({ where: { [param]: value } });

    if (!addressType)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return addressType;
  }

  async createAddressType(addressType: string) {
    return await this.addressTypeEntity.create({ value: addressType });
  }
}
