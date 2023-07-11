import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsCpfCnpj } from 'decoradores/cpfcnpj.decorador';

export class ClienteComEnderecoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj('cpf')
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sobrenome: string;

  @IsNumber()
  clienteId: number;

  @IsBoolean()
  @IsNotEmpty()
  padrao: boolean;

  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsNumber()
  @IsNotEmpty()
  cep: number;
}
