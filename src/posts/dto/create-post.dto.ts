import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreatePostDto {

  @ApiProperty({example: 'Title'})
  @IsString({message: 'Must be a string'})
  readonly title: string

  @ApiProperty({example: 'Some content'})
  @IsString({message: 'Must be a string'})
  readonly content: string

  @ApiProperty({example: 1})
  @IsNumber({}, {message: 'Must be a number'})
  readonly userId: number
}