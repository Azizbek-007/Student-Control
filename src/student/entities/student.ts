import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentTask } from "./task";

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    full_name: string;

    @ManyToOne(() => Category, (category)=> category.students)
    @JoinColumn({name: 'course_id'})
    course: Category;

    @ManyToOne(() => User, (user)=> user.students)
    @JoinColumn({name: 'mentor_id'})
    mentor: User;

    @OneToOne(() => StudentTask, (category) => category.student, { cascade: true })
    tasks: StudentTask[];

    @Column()
    mentor_id: number;
 
    @Column()
    course_id: number;
    
    @CreateDateColumn()
    created_at: Date;
}