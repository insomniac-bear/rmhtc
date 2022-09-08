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
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('/types')
  getOfferTypes() {
    return this.offerService.getOfferTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/type')
  createOfferType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: { value: string }
  ) {
    return this.offerService.createOfferType(req.user, res, data.value);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('type')
  updateOfferType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.offerService.updateOfferType(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post()
  createOffer(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body()
    data: CreateOfferDto
  ) {
    return this.offerService.createOffer(req.user, res, data);
  }
}
