import { Decimal } from '@prisma/client/runtime';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLancamentoSemVencimentoDto {
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
}
