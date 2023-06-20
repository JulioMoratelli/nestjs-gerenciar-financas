import { Decimal } from '@prisma/client/runtime';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateParcelaDto {
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  lancamentoId: number;

  @IsNumber()
  @IsNotEmpty()
  contaId: number;

  @IsNumber()
  @IsNotEmpty()
  numeroParcela: number;

  @IsDate()
  @IsNotEmpty()
  vencimento: Date;

  @IsDecimal()
  @IsNotEmpty()
  valor: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;
}
