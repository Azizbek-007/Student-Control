import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLogin {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}