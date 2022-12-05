import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/create-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from './entities/user.entity';
import { UserLogin } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: UserRegisterDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);
    const user = this.userRepository.create({
      username: dto.username,
      fullname: dto.full_name,
      phone: dto.phone,
      role: dto.role,
      password
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    delete user.password;
    const payloadToken: JwtPayload = { username: user.username };
    const token: string = this.jwtService.sign(payloadToken);
    const payload = {
      user, token 
    }
 
    throw new HttpException({
      successful: true,
      code: 201,
      message: 'successful',
      payload
    }, HttpStatus.CREATED);

  }

  async login(dto: UserLogin){
    const { username, password } = dto;
    const user = await this.userRepository.findOne({ where: { username: username}});
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const payloadToken: JwtPayload = { username };
      const token: string = this.jwtService.sign(payloadToken);
      const payload = {
        user, token 
      }
      throw new HttpException({
        successful: true,
        code: 200,
        message: 'successful',
        payload
      }, HttpStatus.OK);
  
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  } 

}
