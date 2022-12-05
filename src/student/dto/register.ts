import { IsEnum, IsNumber, IsString } from "class-validator";

export class RegisterStudentDTO {
    @IsString()
    full_name: string;

    @IsNumber()
    course_id: number;
}

export class NbStudentDto {
    @IsEnum([1, 0])
    not_came: 1 | 0;

    @IsEnum([1, 0])
    home_work: 1 | 0;
}