import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('ADMIN')
    if (!role) {
      throw new HttpException(`Create role 'ADMIN' first`, HttpStatus.NOT_FOUND)
    }

    await user.$set('roles', [role.id]) //initialisation
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all:true}}) 
    // include prop to add role information 
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.findUserById(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)

    await user.$add('role', role.id)
    return dto
  }

  async ban(dto: BanUserDto) {
    const user = await this.findUserById(dto.userId)

    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId)
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    return user
  }
}
