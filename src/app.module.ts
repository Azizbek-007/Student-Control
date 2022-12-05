import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeormConfig';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    CategoryModule,
    StudentModule],
  
})
export class AppModule {}
