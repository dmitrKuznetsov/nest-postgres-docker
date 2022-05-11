import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiResponse({status: HttpStatus.CREATED, description: 'Bearer Token'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'User with this email exists' })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  } 

  @ApiResponse({status: HttpStatus.CREATED, description: 'Bearer Token'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Incorrect email or password' })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

}
  
