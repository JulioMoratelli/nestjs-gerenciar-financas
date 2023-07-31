import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateParcelaDto {
  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;

  @IsNumber()
  @IsOptional()
  contaId: number;
}
