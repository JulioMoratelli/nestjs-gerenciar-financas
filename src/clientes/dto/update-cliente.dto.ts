// import { IsCpfCnpj } from './../../../decoradores/cpfcnpj.decorador';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsCpfCnpj } from 'decoradores/cpfcnpj.decorador';

export class UpdateClienteDto {
  @IsEmail()
  @IsOptional()
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
