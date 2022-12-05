import { User } from "src/auth/entities/user.entity";
import { Student } from "src/student/entities/student";
import { StudentTask } from "src/student/entities/task";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user)=> user.courses)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => Student, (student) => student.course, { cascade: true })
    students: Student[];

    @OneToMany(() => StudentTask, (category) => category.student, { cascade: true })
    tasks: StudentTask[];

    @Column()
    user_id: number;
    
    @CreateDateColumn()
    created_at: Date;
} 
