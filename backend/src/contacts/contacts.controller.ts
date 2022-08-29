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
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('/types')
  getAllContactTypes() {
    return this.contactsService.getAllContactTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/type')
  createType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: { value: string }
  ) {
    return this.contactsService.createContactType(req.user, res, data.value);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/type')
  updateType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: { uuid: string; value: string }
  ) {
    return this.contactsService.updateContactType(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }
}
