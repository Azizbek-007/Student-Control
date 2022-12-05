import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class RegisterStudentDTO {
    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsNumber()
    course_id: number;
}

export class NbStudentDto {
    @ApiProperty()
    @IsNumber()
    course_id: number;

    @ApiProperty()
    @IsEnum([1, 0])
    not_came: 1 | 0;

    @ApiProperty()
    @IsEnum([1, 0])
    home_work: 1 | 0;
}