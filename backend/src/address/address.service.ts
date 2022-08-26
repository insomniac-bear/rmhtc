import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
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
import { IRawAddress } from './types/rawAddress.interface';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressEntity: typeof Address,
    @Inject(ADDRESS_TYPE_REPOSITORY)
    private readonly addressTypeEntity: typeof AddressType,
    @Inject(COUNTRY_REPOSITORY) private readonly countryEntity: typeof Country,
    @Inject(CITY_REPOSITORY) private readonly cityEntity: typeof City,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async createOrUpdateAddress(
    companyUuid,
    {
      addressTypeUuid,
      countryUuid,
      cityUuid,
      postCode,
      street,
      buildNum,
      roomNum,
    }
  ): Promise<IRawAddress> {
    const existAddress = await this.addressEntity.findOne({
      where: {
        addressTypeUuid,
        companyUuid,
      },
    });

    if (existAddress) {
      await existAddress.update({
        countryUuid,
        cityUuid,
        postCode,
        street,
        buildNum,
        roomNum,
      });
    } else {
      await this.addressEntity.create({
        companyUuid,
        addressTypeUuid,
        countryUuid,
        cityUuid,
        postCode,
        street,
        buildNum,
        roomNum,
      });
    }

    return this.addressEntity.findOne({
      where: {
        addressTypeUuid,
        companyUuid,
      },
    });
  }

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

    if (!countries) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return countries;
  }

  async getAllCities() {
    const cities = await this.cityEntity.findAll();

    if (!cities) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

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

  async createAddressType(
    accessTokenPayload: JwtPayload,
    res,
    value: string
  ): Promise<{ status: string; accessToken: string; types: AddressType[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.addressTypeEntity.findOne({
      where: {
        value,
      },
    });

    if (candidate) {
      throw new HttpException(`${value} already exist`, HttpStatus.BAD_REQUEST);
    }

    await this.addressTypeEntity.create({ value });
    const types = await this.addressTypeEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }

  async updateAddressType(
    accessTokenPayload: JwtPayload,
    res,
    uuid: string,
    value: string
  ): Promise<{ status: string; accessToken: string; types: AddressType[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.addressTypeEntity.findByPk(uuid);

    if (!candidate) {
      throw new HttpException(
        `Address Type isn't exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    const existValue = await this.addressTypeEntity.findOne({
      where: {
        value,
      },
    });

    if (existValue) {
      throw new HttpException(
        `Address type with value ${value} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await candidate.update({ value });
    const types = await this.addressTypeEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      types,
    };
  }

  async createCountry(
    accessTokenPayload: JwtPayload,
    res,
    value: string
  ): Promise<{ status: string; accessToken: string; countries: Country[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.countryEntity.findOne({
      where: {
        value,
      },
    });

    if (candidate) {
      throw new HttpException(`${value} already exist`, HttpStatus.BAD_REQUEST);
    }

    await this.countryEntity.create({ value });
    const countries = await this.countryEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      countries,
    };
  }

  async updateCountry(
    accessTokenPayload: JwtPayload,
    res,
    uuid: string,
    value: string
  ): Promise<{ status: string; accessToken: string; countries: Country[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.countryEntity.findByPk(uuid);

    if (!candidate) {
      throw new HttpException(`Country isn't exist`, HttpStatus.BAD_REQUEST);
    }

    const existValue = await this.countryEntity.findOne({
      where: {
        value,
      },
    });

    if (existValue) {
      throw new HttpException(
        `Country with value ${value} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await candidate.update({ value });
    const countries = await this.countryEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      countries,
    };
  }

  async createCity(
    accessTokenPayload: JwtPayload,
    res,
    value: string
  ): Promise<{ status: string; accessToken: string; cities: City[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.cityEntity.findOne({
      where: {
        value,
      },
    });

    if (candidate) {
      throw new HttpException(`${value} already exist`, HttpStatus.BAD_REQUEST);
    }

    await this.cityEntity.create({ value });
    const cities = await this.cityEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      cities,
    };
  }

  async updateCity(
    accessTokenPayload: JwtPayload,
    res,
    uuid: string,
    value: string
  ): Promise<{ status: string; accessToken: string; cities: City[] }> {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.cityEntity.findByPk(uuid);

    if (!candidate) {
      throw new HttpException(`City isn't exist`, HttpStatus.BAD_REQUEST);
    }

    const existValue = await this.cityEntity.findOne({
      where: {
        value,
      },
    });

    if (existValue) {
      throw new HttpException(
        `City with value ${value} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await candidate.update({ value });
    const cities = await this.cityEntity.findAll();

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      cities,
    };
  }
}
