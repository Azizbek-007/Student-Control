import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { NbStudentDto, RegisterStudentDTO } from './dto/register';
import { Student } from './entities/student';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Post('/register')
    async register (@Body() dto: RegisterStudentDTO, @GetUser() user: User) {
        await this.studentService.register(dto, user);
    }

    @Get()
    async index (@GetUser() user: User) {
        await this.studentService.my_students(user['id']);
    }


    @Put('/:id')
    async no_came(@Param('id') student_id: number, @Body() dto: NbStudentDto, @GetUser() user: User) {
        await this.studentService.update(student_id, dto, user['id']);
    }

    @Get('/today/:course_id')
    async today (@Param('course_id') course_id: number, @GetUser() user: User) {
        await this.studentService.today_student(course_id);
    }
    @Delete()
    async delete () {

    }
}
