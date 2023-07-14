import { IsCpfCnpj } from './../../../decoradores/cpfcnpj.decorador';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsCpfCnpj('cpf')
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  sobrenome?: string;
}
