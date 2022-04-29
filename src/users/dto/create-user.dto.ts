import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  
  @ApiProperty({example: 'user@mail.ru', description: 'Mailing address'})
  readonly email: string
  
  @ApiProperty({example: '13413434', description: 'Password'})
  readonly password: string
}