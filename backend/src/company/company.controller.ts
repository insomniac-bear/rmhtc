import { Body, Controller, Get, Post, Put, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {}

  @ApiOperation({ summary: 'Получение компаний пользователя' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsersCompanies(
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    return this.companiesService.getUsersCompanies(req.user, res);
  }
}
