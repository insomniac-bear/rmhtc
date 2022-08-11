import {
  Body,
  Controller,
  Get,
  Patch,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { CompanyDataDto, CompanyDto } from './dto';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {}

  @ApiOperation({ summary: 'Получение компаний пользователя' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({
    status: 200,
    description: 'Получение всех компаний пользователя',
    type: CompanyDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUsersCompanies(@Req() req, @Res({ passthrough: true }) res) {
    return this.companiesService.getUsersCompanies(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/user')
  updateUserCompany(
    @Res({ passthrough: true }) res,
    @Body() companyData: CompanyDataDto
  ) {
    return this.companiesService.updateUsersCompany(companyData, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/moderate')
  getCompaniesForModerate() {
    return this.companiesService.getCompaniesForModerate();
  }
}
