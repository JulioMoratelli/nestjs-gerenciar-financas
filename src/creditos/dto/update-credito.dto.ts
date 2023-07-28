import { Decimal } from '@prisma/client/runtime';
import { IsDecimal } from 'class-validator';

export class UpdateCreditoDto {
  @IsDecimal()
  valor: Decimal;
}
