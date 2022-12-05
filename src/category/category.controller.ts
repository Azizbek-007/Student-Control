import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CategoryService } from './category.service';
import { CourseRegister } from './dto/create-course';

@ApiTags('Coures')
@Controller('course')
@UseGuards(AuthGuard()) 
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Post('/')
    async create (@Body() dto: CourseRegister, @GetUser() user: User): Promise<void> {
        await this.categoryService.Register(dto, user);
    }

    @Get('/:id')
    async index (@GetUser() user: User, @Param('id') course_id?: number): Promise<void> {
        await this.categoryService.index(user['id'], course_id)
    }

    @Patch('/:id')
    async updte(@Param('id') course_id: number, @GetUser() user: User, @Body() dto: CourseRegister): Promise<void> {
        await this.categoryService.update(course_id, user, dto)
    }

    @Delete('/:id')
    async delete (@Param('id') course_id: number, @GetUser() user: User): Promise<void> {
        await this.categoryService.delete(course_id, user);
    }
}
