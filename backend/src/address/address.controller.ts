import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddressService } from './address.service';
import { AddressTypeDto } from './dto';

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
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '["Russia", "Malaysia"] e.t.c.',
  })
  @Get('/countries')
  getCountries() {
    return this.addressService.getAllCountries();
  }

  @ApiOperation({ summary: 'Получение всех городов' })
  @ApiResponse({
    status: 200,
    isArray: true,
    description: '["Moscow", "Singapore"] e.t.c.',
  })
  @Get('/cities')
  getCities() {
    return this.addressService.getAllCities();
  }

  @ApiOperation({ summary: 'Создание нового типа адреса' })
  @ApiResponse({
    status: 201,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/type')
  createType(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { value: string }
  ) {
    return this.addressService.createAddressType(req.user, res, data.value);
  }

  @ApiOperation({ summary: 'Обновление существующего типа адреса' })
  @ApiResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/type')
  updateType(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.addressService.updateAddressType(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }

  @ApiOperation({ summary: 'Создание новой страны' })
  @ApiResponse({
    status: 201,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/country')
  createCountry(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { value: string }
  ) {
    return this.addressService.createCountry(req.user, res, data.value);
  }

  @ApiOperation({ summary: 'Обновление существующей страны' })
  @ApiResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/country')
  updateCountry(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.addressService.updateCountry(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }

  @ApiOperation({ summary: 'Создание нового города' })
  @ApiResponse({
    status: 201,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/city')
  createCity(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { value: string }
  ) {
    return this.addressService.createCity(req.user, res, data.value);
  }

  @ApiOperation({ summary: 'Обновление существующего города' })
  @ApiResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/city')
  updateCity(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.addressService.updateCity(req.user, res, data.uuid, data.value);
  }
}
