import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class CreateRoleDto {
  @ApiProperty({example: 'TESTER'})
  @IsString({message: 'Must be a string'})
  readonly value: string

  @ApiProperty({example: 'tester'})
  @IsString({message: 'Must be a string'})
  readonly description: string
}