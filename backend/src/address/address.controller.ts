import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddressTypeDto } from './dto';
import { IAddressType } from './types'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Получение всех типов адресов' })
  @ApiResponse({ status: 200, type: AddressTypeDto })
  @Get('/types')
  getAddressTypes() {
    return this.addressService.getAllAddressTypes();
  }

  @ApiOperation({ summary: 'Получение всех стран' })
  @ApiResponse({ status: 200, isArray: true, description: '["Russia", "Malaysia"] e.t.c.' })
  @Get('/countries')
  getCountries() {
    return this.addressService.getAllCountries();
  }

  @ApiOperation({ summary: 'Получение всех городов' })
  @ApiResponse({ status: 200, isArray: true, description: '["Moscow", "Singapore"] e.t.c.' })
  @Get('/cities')
  getCities() {
    return this.addressService.getAllCities();
  }
}
