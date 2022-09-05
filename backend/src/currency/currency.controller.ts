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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('all')
  getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post()
  createCurrency(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { value: string }
  ) {
    return this.currencyService.createCurrency(req.user, res, data.value);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch()
  updateCurrency(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.currencyService.updateCurrency(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }
}
