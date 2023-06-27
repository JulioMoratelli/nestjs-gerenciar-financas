import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @Expose()
  get nomeCompleto(): string {
    return this.nome ?? this.sobrenome;
  }
}
