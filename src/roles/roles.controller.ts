import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { GetRoleByValueDto } from './dto/get-role-by-value.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) {}

  @ApiOperation({summary: 'Create role'})
  @ApiResponse({status: HttpStatus.CREATED, type: Role})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Role already exist' })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto)
  }

  @ApiResponse({status: HttpStatus.OK, type: Role})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Role not found' })
  @Get('/:value')
  getByValue(@Param() dto: GetRoleByValueDto) {
    return this.roleService.getRoleByValue(dto.value)
  }
}
