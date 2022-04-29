import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({example: '1', description: 'Unique identificator'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'user@mail.ru', description: 'Mailing address'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string

  @ApiProperty({example: '13413434', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @ApiProperty({example: 'true', description: 'Banned user or not'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean

  @ApiProperty({example: 'For hooliganism', description: 'Ban reason'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string
}