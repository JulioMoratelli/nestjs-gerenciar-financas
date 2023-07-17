import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}
