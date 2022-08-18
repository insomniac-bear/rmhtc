import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessengersService } from './messengers.service';

@Controller('messengers')
export class MessengersController {
  constructor(private readonly messengerService: MessengersService) {}

  @Get('/types')
  getTypesOfMessenger() {
    return this.messengerService.getAllTypesOfMessenger();
  }

  @Post()
  createMessenger(
    @Body()
    value: string,
    messengerTypeUuid: string,
    companyUuid: string
  ) {
    this.messengerService.createMessenger(
      messengerTypeUuid,
      value,
      companyUuid
    );
  }
}
