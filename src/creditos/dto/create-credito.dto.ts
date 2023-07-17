import { Decimal } from '@prisma/client/runtime';
import { IsDecimal, IsNumber } from 'class-validator';

export class CreateCreditoDto {
  @IsNumber()
  contaId: number;

  @IsDecimal()
  valor: Decimal;
}
