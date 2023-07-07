import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsCpfCnpj } from 'decoradores/cpfcnpj.decorador';

export class CreateClienteDto {
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

  @Expose()
  get nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}
