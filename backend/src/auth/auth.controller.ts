import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FinishRegistrationDto,
  LoginDto,
  RegistrationResponseDto,
  RegistrationUserDto,
  ResponseFinishRegistration,
  ResponseLoginDto,
} from './dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { ConfirmEmailDto, ResponseConfirmEmail } from './dto/confirm-email.dto';
import { ResponseLogoutDto } from './dto/logout.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: RegistrationResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/registration')
  registration(
    @Body()
    data: RegistrationUserDto
  ) {
    return this.authService.registration(data);
  }

  @ApiOperation({ summary: 'Подтверждение email' })
  @ApiResponse({ status: 200, type: ResponseConfirmEmail })
  @ApiQuery({
    name: 'emailToken',
    type: ConfirmEmailDto,
    isArray: false,
    enum: 'string',
    enumName: 'emailToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/email-verify')
  confirmEmail(@Query() query: ConfirmEmailDto) {
    return this.authService.confirmEmail(query);
  }

  @ApiOperation({ summary: 'Завершение регистрации' })
  @ApiResponse({ status: 200, type: ResponseFinishRegistration })
  @HttpCode(HttpStatus.OK)
  @Post('finish-registration')
  finishRegistration(
    @Body()
    updatedData: FinishRegistrationDto,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.finishRegistration(updatedData, res);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: ResponseLoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Body()
    data: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(data, res);
  }

  @ApiOperation({ summary: 'Выход из приложения' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({
    status: 200,
    type: ResponseLogoutDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Req()
    req,
    @Res({ passthrough: true })
    res: Response
  ) {
    const user = req.user;
    return this.authService.logout(user.sub, res);
  }

  @ApiOperation({ summary: 'Проверка авторизации' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  // @Roles('USER', 'ADMINISTRATOR')
  // @UseGuards(RolesGuard)
  @Get('/check')
  check(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const accessToken = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : undefined;
    const { refreshToken }: { refreshToken: string } = req.cookies;

    return this.authService.checkAuth(accessToken, refreshToken, res);
  }
}
