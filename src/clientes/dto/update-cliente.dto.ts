// import { IsCpfCnpj } from './../../../decoradores/cpfcnpj.decorador';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  // @IsEmail()
  // @IsOptional()
  // email?: string;

  // @IsString()
  // @IsCpfCnpj('cpf')
  // @IsOptional()
  // cpf?: string;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  sobrenome?: string;
}
