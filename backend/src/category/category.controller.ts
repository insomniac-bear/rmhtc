import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getCategories() {
    return this.categoryService.getCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Post()
  createCategory(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { category: string }
  ) {
    return this.categoryService.createCategory(req.user, res, data.category);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuard)
  @Patch()
  updateCategory(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() data: { uuid: string; category: string }
  ) {
    return this.categoryService.updateCategory(
      req.user,
      res,
      data.uuid,
      data.category
    );
  }
}
