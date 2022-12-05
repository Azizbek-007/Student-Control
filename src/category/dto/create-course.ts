import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CourseRegister {
    @ApiProperty()
    @IsString()
    name: string;
}