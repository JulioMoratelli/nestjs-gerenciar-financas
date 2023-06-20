import { Decimal } from '@prisma/client/runtime';
import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateLancamentoDto {
  @IsDecimal()
  @IsNotEmpty()
  valorTotal: Decimal;

  @IsInt()
  @IsNotEmpty()
  numeroParcelas: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  clienteId: number;
}
