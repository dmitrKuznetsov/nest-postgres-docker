import { IsString } from 'class-validator';

export class GetRoleByValueDto {
  @IsString()
  value: string;
}
