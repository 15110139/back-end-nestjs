
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class validationObj implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    // console.log('value', value)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const newVal = Object['values'](value)[0]
    // console.log('newValue',newVal)
    const object = plainToClass(metatype, newVal);
    const errors = await validate(object);
    if (errors.length > 0) {
      // console.error('Validate input', errors)
      const arrError = errors.map(el => Object['values'](el.constraints)[0])
      // console.log(arrError)
      throw arrError
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}