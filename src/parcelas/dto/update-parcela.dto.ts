import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Decimal } from '@prisma/client/runtime';

export class UpdateParcelaDto {
  @IsDate()
  @IsNotEmpty()
  vencimento: Date;

  @IsDecimal()
  @IsNotEmpty()
  valor: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;

  @IsNumber()
  @IsOptional()
  contaId: number;
}
