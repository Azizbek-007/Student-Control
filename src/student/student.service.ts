import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category';
import { Like, Repository } from 'typeorm';
import { NbStudentDto, RegisterStudentDTO } from './dto/register';
import { Student } from './entities/student';
import { StudentTask } from './entities/task';

@Injectable()
export class StudentService {
    @InjectRepository(Student) private StudentRepo: Repository<Student>
    @InjectRepository(Category) private CategoryRepo: Repository<Category>
    @InjectRepository(StudentTask) private StudentTaskRepo: Repository<StudentTask>

    async register (dto: RegisterStudentDTO, user: User): Promise<void> {
        const course = await this.CategoryRepo.findOneBy({ id: dto.course_id, user_id: user['id']});
        if (course == null) {
            throw new NotFoundException("you don't have such a course");
        }
        const student = this.StudentRepo.create({
            full_name: dto.full_name,
            course_id: dto.course_id,
            mentor: user
        });
        try {
            await student.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        delete student.mentor;
        throw new HttpException({
            successful: true,
            code: 201,
            message: 'student created',
            payload: { student }
        }, HttpStatus.CREATED);
    }

    async my_students (user: number) {
        const students = await this.StudentRepo.find({ 
            relations: { 
                course: true
            }, 
            where: { 
                mentor_id: user 
            }
        });
        if (!students) throw new NotFoundException("You have no students");
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'students',
            payload: students
        }, HttpStatus.OK);
    }

    async update(student_id: number, dto: NbStudentDto, user: number): Promise<void> {
        const Isstudent = await this.StudentRepo.findOneBy({id: student_id, mentor_id: user});
        const IsCourse = await this.CategoryRepo.findOneBy({ id: dto.course_id, user_id: user });
        if (!Isstudent || !IsCourse) throw new NotFoundException("You have no student");
     
        const StudentTask = this.StudentTaskRepo.create({
            course: IsCourse,
            not_came: dto.not_came,
            home_work: dto.home_work, 
            student: Isstudent
        });

        try { 
            await StudentTask.save();
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error);
        }

        throw new HttpException({
            successful: true,
            code: 200,
            message: 'succesful',
            payload: StudentTask
        }, HttpStatus.OK);
    }


    async today_student (course_id: number): Promise<void> {
        const date = new Date().toISOString().split('T')[0];
        const students = await this.StudentTaskRepo.find({ 
            relations: {
                student: true,
                course:  true
            },
            where: {
                created_at: Like(`%${date}%`)
            }
        });
        
        throw new HttpException({ 
            successful: true,
            code: 200,
            message: 'succesful',
            payload: students
        }, HttpStatus.OK); 
    }

    async delete (student_id: number, user: User): Promise<void> {
        const student = await this.StudentRepo.findOneBy({ id: student_id, mentor_id: user['id'] });

        if (!student || student == null){
            throw new NotFoundException();
        }
        await this.StudentRepo.remove(student);
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'course deleted',
        }, HttpStatus.OK);
    }

}
