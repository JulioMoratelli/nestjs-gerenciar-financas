import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsCpfCnpj } from 'decoradores/cpfcnpj.decorador';
import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';

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

  enderecos?: CreateEnderecoDto;
}
