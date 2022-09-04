import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],
  imports: [RolesModule, AuthModule],
})
export class CategoryModule {}
