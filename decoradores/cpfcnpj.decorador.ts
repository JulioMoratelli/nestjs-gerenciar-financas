import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'IsCpfCnpjConstraint', async: true })
@Injectable()
export class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [type] = args.constraints;

    if (!value || !type) return false;

    if (type == 'cnpj') return cnpj.isValid(value);

    return cpf.isValid(value);
  }
}

export function IsCpfCnpj(type: 'cpf' | 'cnpj', opts?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...opts,
        message: `cpf ou cnpj invalido`,
      },
      constraints: [type],
      validator: IsCpfCnpjConstraint,
    });
  };
}
