import { Body, Controller, Get, Post, Put, Res, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companiesService: CompanyService,
  ) {}

  @ApiOperation({ summary: 'Получение компаний пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Получение всех компаний пользователя',
    type: CompanyDto
  })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUsersCompanies(
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    return this.companiesService.getUsersCompanies(req.user, res);
  }
}
