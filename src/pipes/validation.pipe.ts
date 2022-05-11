import { ValidationException } from './../exception/validation.exception';
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
    const obj = plainToClass(metadata.metatype, value)

    if (!obj) return value  //!!!quick fix

    const errors = await validate(obj)

    if (errors.length) {
      let messages = errors
      .map(error => `${error.property} - ${Object.values(error.constraints).join(', ')}`)
      
      throw new ValidationException(messages)
    }
    return value
  }

}