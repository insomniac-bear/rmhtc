import {
  Body,
  Controller,
  Get,
  Query,
  Patch,
  Post,
  Res,
  Req,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { BufferedFile } from 'src/core/minio-client/types/minio.interface';

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

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/logo')
  @UseInterceptors(FileInterceptor('logo'))
  uploadLogo(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Query() query,
    @UploadedFile() file: BufferedFile
  ) {
    return this.companiesService.uploadFile(
      req.user,
      res,
      query,
      file,
      'logoUrl'
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/regdoc')
  @UseInterceptors(FileInterceptor('regdoc'))
  uploadRegDoc(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Query() query,
    @UploadedFile() file: BufferedFile
  ) {
    return this.companiesService.uploadFile(
      req.user,
      res,
      query,
      file,
      'regDocUrl'
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/ceo')
  @UseInterceptors(FileInterceptor('ceo'))
  uploadCeoDoc(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Query() query,
    @UploadedFile() file: BufferedFile
  ) {
    return this.companiesService.uploadFile(
      req.user,
      res,
      query,
      file,
      'ceoDocUrl'
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/presentation')
  @UseInterceptors(FileInterceptor('presentation'))
  uploadPresentation(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Query() query,
    @UploadedFile() file: BufferedFile
  ) {
    return this.companiesService.uploadFile(
      req.user,
      res,
      query,
      file,
      'presentationUrl'
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
  getCompaniesForModerate(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Query() query
  ) {
    return this.companiesService.getCompaniesForModerate(req.user, res, query);
  }

  @ApiOperation({ summary: 'Изменение статуса модерации компании' })
  @ApiResponse({ status: 200 })
  @ApiParam({
    name: 'Company uuid',
    example: '?uuid=9e4536eb-26f5-48b0-8c79-bd5ef7d71be9',
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch('/moderate/change')
  moderateCompany(
    @Body() data,
    @Query() query,
    @Req() req,
    @Res({ passthrough: true }) res
  ) {
    return this.companiesService.moderateCompany(req.user, res, data, query);
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
  getLegalForms() {
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

  @ApiOperation({ summary: 'Получение всех одобренных компаний' })
  @ApiResponse({
    status: 200,
    description: 'Получение всех одобренных компаний',
  })
  @Get('/')
  getApproveCompanies(@Query() query) {
    return this.companiesService.getApproveCompanies(query);
  }

  @ApiOperation({ summary: 'Получение одной одобренной компаний' })
  @ApiResponse({
    status: 200,
    description: 'Получение одной одобренной компаний',
  })
  @Get('/:uuid')
  getCompany(@Param() param) {
    return this.companiesService.getCompany(param.uuid);
  }
}
