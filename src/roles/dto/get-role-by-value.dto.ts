import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetRoleByValueDto {
  @ApiProperty({example: 'ADMIN'})
  @IsString({message: 'Must be a string'})
  value: string;
}
