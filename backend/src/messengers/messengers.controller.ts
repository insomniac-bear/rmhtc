import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTypeDto, MessengerTypeDto, UpdateTypeDto } from './dto';
import { MessengersService } from './messengers.service';

@ApiTags('Messengers')
@Controller('messengers')
export class MessengersController {
  constructor(private readonly messengerService: MessengersService) {}

  @ApiOperation({ summary: 'Получение всех типов мессенджеров' })
  @ApiResponse({
    status: 200,
    type: [MessengerTypeDto],
  })
  @Get('/types')
  getTypesOfMessenger() {
    return this.messengerService.getAllTypesOfMessenger();
  }

  @ApiOperation({ summary: 'Создание нового типа мессенджера' })
  @ApiResponse({
    status: 201,
    type: [MessengerTypeDto],
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post('/type')
  createType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: CreateTypeDto
  ) {
    return this.messengerService.createMessengerType(req.user, res, data.value);
  }

  @ApiOperation({ summary: 'Обновление существующего типа мессенджера' })
  @ApiResponse({
    status: 200,
    type: [MessengerTypeDto],
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/type')
  updateType(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: UpdateTypeDto
  ) {
    return this.messengerService.updateMessengerType(
      req.user,
      res,
      data.uuid,
      data.value
    );
  }
}
