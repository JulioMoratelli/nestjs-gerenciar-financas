import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContaDto {
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsString()
  nome: string;
}
