import {
  Body,
  Controller,
  Post,
  Patch,
  Res,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { UserDataDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { BufferedFile } from 'src/core/minio-client/types/minio.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Roles('USER', 'ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch()
  update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() userData: UserDataDto
  ) {
    const { sub } = req.user;
    return this.userService.updateUser(sub, userData, res);
  }

  @ApiOperation({ summary: 'Сохранение аватара пользователя' })
  @ApiHeader({
    name: 'Authorization',
    allowEmptyValue: false,
    description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR', 'USER')
  @UseGuards(RolesGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  uploadAvatar(
    @Req() req,
    @Res({ passthrough: true }) res,
    @UploadedFile() image: BufferedFile
  ) {
    const { sub } = req.user;
    return this.userService.uploadAvatar(sub, image, res);
  }
}
