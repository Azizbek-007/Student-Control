import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/category/entities/category';
import { Student } from './entities/student';
import { StudentTask } from './entities/task';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([Student, StudentTask, Category]), AuthModule],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {}
