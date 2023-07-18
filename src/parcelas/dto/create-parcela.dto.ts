import { Decimal } from '@prisma/client/runtime';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateParcelaDto {
  @IsNumber()
  @IsNotEmpty()
  lancamentoId: number;

  @IsNumber()
  @IsNotEmpty()
  contaId: number;

  @IsNumber()
  @IsNotEmpty()
  numeroParcela: number;

  @IsDateString()
  @IsNotEmpty()
  vencimento: Date;

  @IsDecimal()
  @IsNotEmpty()
  valor: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;
}
