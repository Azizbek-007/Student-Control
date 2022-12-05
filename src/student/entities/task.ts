import { Category } from "src/category/entities/category";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student";

@Entity()
export class StudentTask extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Student, (student)=> student.tasks, { eager: true, persistence: true})
    @JoinColumn({name: 'student_id'})
    student: Student;
    
    @ManyToOne(() => Category, (category)=> category.tasks)
    @JoinColumn({name: 'course_id'})
    course: Category;

    @Column()
    course_id: number;
    
    @Column()
    student_id: number;

    @Column({default: 0 })
    not_came: 1 | 0;

    @Column({ default: 0 })
    home_work: 1 | 0;

    @CreateDateColumn()
    created_at: string;
} 