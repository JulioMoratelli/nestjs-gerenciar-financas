import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsNumber()
  clienteId: number;

  @IsBoolean()
  @IsNotEmpty()
  padrão: boolean;

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

  @IsString()
  @IsNotEmpty()
  cep: number;
}
