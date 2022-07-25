import { Body, Controller, Get, Post, Put, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDataDto, UserDto } from './dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: UserDataDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() userData: UserDataDto,
  ) {
    const { sub } = req.user;
    return this.userService.updateUser(sub, userData, res);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
