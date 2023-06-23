import { Decimal } from '@prisma/client/runtime';
import { IsDecimal, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sobrenome: string;
}
