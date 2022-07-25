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
  UseGuards
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationResponseDto } from './dto';
import { AuthService } from './auth.service';
import { UserDataDto, UserDto } from 'src/users/dto';
import { AuthGuard } from '@nestjs/passport';

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
    email: string
  ) {
    return this.authService.registration(email);
  }

  @ApiOperation({ summary: 'Подтверждение email' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiQuery({ name: 'emailToken', example: '?emailToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  @HttpCode(HttpStatus.OK)
  @Get('/email-verify')
  confirmEmail(@Query() query) {
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
    name: 'Authorization with Bearer',
    description: 'Необходимо отправлять access token в заголовке'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user;
    return this.authService.logout(user.sub, res);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/refresh')
  refresh(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user;
    const { refreshToken } = req.cookies;

    return this.authService.refresh(user, refreshToken, res);
  }
}
