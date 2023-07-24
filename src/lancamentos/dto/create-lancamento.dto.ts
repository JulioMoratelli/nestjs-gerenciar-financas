import { Decimal } from '@prisma/client/runtime';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateLancamentoDto {
  @IsDecimal()
  @IsNotEmpty()
  valorTotal: Decimal;

  @IsNumber()
  @IsNotEmpty()
  numeroParcelas: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDate()
  @IsNotEmpty()
  primeiroVencimento: Date;
}
