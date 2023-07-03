import { Decimal } from '@prisma/client/runtime';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;
}
