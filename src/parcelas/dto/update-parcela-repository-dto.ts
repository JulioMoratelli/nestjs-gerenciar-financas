import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateParcelaRepositoryDto {
  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;

  @IsNumber()
  @IsOptional()
  contaId: number;

  @IsDate()
  dataAlterado: Date;
}
