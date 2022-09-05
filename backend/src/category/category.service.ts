import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryEntity: typeof Category,
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  async getCategories() {
    const categories = await this.categoryEntity.findAll();
    return {
      status: 'success',
      categories,
    };
  }

  async createCategory(
    accessTokenPayload: JwtPayload,
    res: Response,
    newCategory: string
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.categoryEntity.findOne({
      where: {
        value: newCategory,
      },
    });

    if (candidate) {
      throw new HttpException(
        `Category ${newCategory} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.categoryEntity.create({
      value: newCategory,
    });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      categories: await this.categoryEntity.findAll(),
    };
  }

  async updateCategory(
    accessTokenPayload: JwtPayload,
    res: Response,
    categoryUuid,
    newCategoryValue
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.categoryEntity.findByPk(categoryUuid);

    if (!candidate.uuid) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }

    await candidate.update({ value: newCategoryValue });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      categories: await this.categoryEntity.findAll(),
    };
  }
}
