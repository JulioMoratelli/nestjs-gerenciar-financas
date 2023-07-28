import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLancamentoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDate()
  @IsNotEmpty()
  primeiroVencimento: Date;
}
