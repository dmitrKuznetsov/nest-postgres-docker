// import { ValidationPipe } from './../pipes/validation.pipe';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, HttpStatus, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
 
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiResponse({status: HttpStatus.OK, type: [User]})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'No access' })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }
 
  @ApiBearerAuth()
  @ApiOperation({summary: 'Add role'})
  @ApiResponse({status: HttpStatus.CREATED, type: AddRoleDto})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'No access' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }
 
  @ApiBearerAuth()
  @ApiOperation({summary: 'Ban user'})
  @ApiResponse({status: HttpStatus.CREATED, type: User})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'No access' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto)
  }
}
