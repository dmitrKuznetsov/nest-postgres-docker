import { Role } from './../roles/roles.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserRoles } from 'src/roles/user-roles.model';
import { PostModel } from 'src/posts/posts.model';
interface UserCreationAttrs {
  email: string
  password: string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({example: '1'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'user@mail.ru'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @ApiProperty({example: '13413434'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @ApiProperty({example: 'true'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean

  @ApiProperty({example: 'For hooliganism'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string

  @ApiProperty({ type: () => [Role] })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @ApiProperty({ type: () => [PostModel] })
  @HasMany(() => PostModel)
  posts: PostModel[]
}