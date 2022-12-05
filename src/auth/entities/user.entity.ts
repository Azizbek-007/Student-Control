
import { Category } from 'src/category/entities/category';
import { Student } from 'src/student/entities/student';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../util/user.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  username: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column()
  phone: string;
 
  @Column()
  role: UserRole

  @OneToMany(() => Category, (category) => category.user, { cascade: true })
  courses: Category[];

  @OneToMany(() => Student, (student) => student.mentor, { cascade: true })
  students: Student[];

  @CreateDateColumn()
  created_at: Date;
    
}
