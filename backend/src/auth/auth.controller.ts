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
import { RegistrationResponseDto, RegistrationUserDto } from './dto';
import { AuthService } from './auth.service';
import { UserDataDto, UserDto } from 'src/users/dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';
import { ConfirmEmailDto, ResponseConfirmEmail } from './dto/confirm-email.dto';

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
    email: RegistrationUserDto
  ) {
    return this.authService.registration(email);
  }

  @ApiOperation({ summary: 'Подтверждение email' })
  @ApiResponse({ status: 200, type: ResponseConfirmEmail })
  @ApiQuery({
    name: 'emailToken',
    example: '?emailToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/email-verify')
  confirmEmail(@Query() query: ConfirmEmailDto) {
    return this.authService.confirmEmail(query);
  }

  @ApiOperation({ summary: 'Завершение регистрации' })
  @ApiResponse({ status: 200, type: UserDto })
  @HttpCode(HttpStatus.OK)
  @Post('finish-registration')
  finshRegistration(@Body() updatedData, @Res({ passthrough: true }) res) {
    return this.authService.finishRegistration(updatedData, res);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: UserDto })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Body() userDto: UserDataDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(userDto, res);
  }

  @ApiOperation({ summary: 'Выход из приложения' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req, @Res({ passthrough: true }) res: Response) {
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
  @Roles('USER', 'ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Get('/check')
  check(@Req() req, @Res({ passthrough: true }) res) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { refreshToken } = req.cookies;

    return this.authService.checkAuth(accessToken, refreshToken, res);
  }
}
