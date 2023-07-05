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

  @IsNumber()
  @IsOptional()
  contaId: number;
}
