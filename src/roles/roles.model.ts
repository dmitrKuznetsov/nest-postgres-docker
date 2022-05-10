import { User } from './../users/users.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string
  description: string
}

@Table({tableName:'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({example: '1'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ADMIN'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string

  @ApiProperty({example: 'Administrator'})
  @Column({type: DataType.STRING, allowNull: false})
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}