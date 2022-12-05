import { IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from '../util/user.enum';

export class UserRegisterDto {
  @IsString()
  full_name: string;

  @IsPhoneNumber('UZ')
  phone: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
