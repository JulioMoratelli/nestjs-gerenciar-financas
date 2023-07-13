import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCpfCnpj } from 'decoradores/cpfcnpj.decorador';

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
