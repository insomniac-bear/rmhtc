import {
  Body,
  Controller,
  Get,
  Query,
  Patch,
  Res,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CompanyService } from './company.service';
import {
  BusinessTypeDocDescription,
  CompanyDto,
  LegalFormDocDescription,
} from './dto';
import { IFullCompany } from './types';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {}

  /**
   * ******************************************
   * Users routes
   * ******************************************
   */

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
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('/user')
  getUsersCompanies(@Req() req, @Res({ passthrough: true }) res) {
    return this.companiesService.getUsersCompanies(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Patch('/user')
  updateUserCompany(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() companyData: IFullCompany
  ) {
    return this.companiesService.updateUsersCompany(
      req.user,
      companyData,
      true,
      res
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Patch('/user/save')
  saveUserCompany(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() companyData: IFullCompany
  ) {
    return this.companiesService.updateUsersCompany(
      req.user,
      companyData,
      false,
      res
    );
  }

  /**
   * ******************************************
   * Moderation Routes
   * ******************************************
   */

  @ApiOperation({ summary: 'Получение компаний для модерации' })
  @ApiResponse({ status: 200, type: [CompanyDto] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Get('/moderate')
  getCompaniesForModerate(@Req() req, @Res({ passthrough: true }) res) {
    return this.companiesService.getCompaniesForModerate(req.user, res);
  }

  @ApiOperation({ summary: 'Отклонение компании с модерации' })
  @ApiResponse({ status: 200 })
  @ApiParam({
    name: 'Company uuid',
    example: '?uuid=9e4536eb-26f5-48b0-8c79-bd5ef7d71be9',
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/moderate/decline')
  declineCompanyFromModerate(
    @Body() data,
    @Query() query,
    @Req() req,
    @Res({ passthrough: true }) res
  ) {
    return this.companiesService.declainCompanyFromModerate(
      req.user,
      res,
      data,
      query
    );
  }

  @ApiOperation({ summary: 'Получение компании для модерации' })
  @ApiResponse({ status: 200, type: CompanyDto })
  @ApiParam({
    name: 'Company uuid',
    example: '9e4536eb-26f5-48b0-8c79-bd5ef7d71be9',
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Get('/moderate/:uuid')
  getCompanyForModerate(
    @Param() uuid,
    @Req() req,
    @Res({ passthrough: true }) res
  ) {
    return this.companiesService.getCompanyForModerate(req.user, res, uuid);
  }

  /**
   * ******************************************
   * Utils routes
   * ******************************************
   */

  @ApiOperation({ summary: 'Получение юридических форм' })
  @ApiResponse({
    status: 200,
    description: 'Получение всех юридических форм',
    type: LegalFormDocDescription,
  })
  @Get('/legal-forms')
  getLegalFroms() {
    return this.companiesService.getLegalForms();
  }

  @ApiOperation({ summary: 'Получение типов бизнеса' })
  @ApiResponse({
    status: 200,
    description: 'Получение всех возможных типов бизнеса',
    type: BusinessTypeDocDescription,
  })
  @Get('/business-types')
  getBusinessType() {
    return this.companiesService.getBusinessTypes();
  }
}
