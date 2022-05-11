import { User } from './../users/users.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

interface PostCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({tableName:'posts'})
export class PostModel extends Model<PostModel, PostCreationAttrs> {

  @ApiProperty({example: 7})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'Title'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string

  @ApiProperty({example: 'Some content'})
  @Column({type: DataType.STRING, allowNull: false})
  content: string

  @ApiProperty({example: 'bfc40b6b-7187-429b-a0e2-ff453c8e2b89.jpg'})
  @Column({type: DataType.STRING, allowNull: false})
  image: string

  @ApiProperty({example: 1})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User)
  author: User
}