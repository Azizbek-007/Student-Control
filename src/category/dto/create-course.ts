import { IsString } from "class-validator";

export class CourseRegister {
    @IsString()
    name: string;
}