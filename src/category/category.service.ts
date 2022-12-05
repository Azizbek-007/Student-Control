import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CourseRegister } from './dto/create-course';
import { Category } from './entities/category';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private CureseRep: Repository<Category>,
        @InjectRepository(User) private UserRep: Repository<User>
    ) {}

    async Register(dto: CourseRegister, user: User) {
        const course = this.CureseRep.create({ name: dto.name, user: user });
        try {
            await course.save();
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error);
        }

        delete course.user;
        throw new HttpException({
            successful: true,
            code: 201,
            message: 'course created',
            payload: { course }
        }, HttpStatus.CREATED);
    }
  
    async index (user: number){
        const mycourse = await this.CureseRep.findBy({ user_id: user });
        if ( mycourse.length === 0 ) throw new NotFoundException("you don't have courses");
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'succesful',
            paload: mycourse
        }, HttpStatus.OK);
    } 

    async update (course_id: number, user: User, dto: CourseRegister) {
        const course = await this.CureseRep.findOneBy({ id: course_id, user_id: user['id'] });
        if (!course) throw new NotFoundException("course not found");
        course.name = dto.name;
        try {
            await course.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'course updated',
            paload: course
        }, HttpStatus.OK);
    }

    async delete (course_id: number, user: User): Promise<void> {
        const course = await this.CureseRep.findOneBy({ id: course_id, user_id: user['id'] });
        console.log(course)
        if (!course || course == null){
            throw new NotFoundException();
        }
        await this.CureseRep.remove(course);
        throw new HttpException({
            successful: true,
            code: 200,
            message: 'course deleted',
        }, HttpStatus.OK);
    }
}
