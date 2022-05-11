import { Role } from './roles.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  
  async createRole (dto: CreateRoleDto) {
    const existingRole = await this.roleRepository.findOne({where: {value: dto.value}})
    if (existingRole) {
      throw new HttpException(`Role already exist`, HttpStatus.BAD_REQUEST)
    }
    const role = await this.roleRepository.create(dto)
    return role
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({where: {value}})
    if (!role) {
      throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND)
    }
    return role
  }
}
