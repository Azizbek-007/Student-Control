import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from '../util/user.enum';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
