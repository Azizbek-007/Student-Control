import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category';

@Module({
  imports: [TypeOrmModule.forFeature([ Category, User]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
