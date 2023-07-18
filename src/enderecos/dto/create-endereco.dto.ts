import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEnderecoDto {
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
