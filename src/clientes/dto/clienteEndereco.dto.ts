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
  @IsOptional()
  clienteId?: number;

  @IsBoolean()
  @IsOptional()
  padrao?: boolean;

  @IsString()
  @IsOptional()
  rua?: string;

  @IsNumber()
  @IsOptional()
  numero?: number;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsNumber()
  @IsOptional()
  cep?: number;
}
