import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/create-user.dto';
import { UserLogin } from './dto/user-login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() authCreateDto: UserRegisterDto): Promise<void> {
    return await this.authService.register(authCreateDto);
  }

  @Post('/login')
  async login(@Body() dto: UserLogin){
    return await this.authService.login(dto);
  }

  @Get('/account')
  async account () {
    
  }


}
