import { Parcela } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ParcelaEntity implements Parcela {
  id: number;
  clienteId: number;
  lancamentoId: number;
  contaId: number;
  numeroParcela: number;
  vencimento: Date;
  valor: Decimal;
  pago: boolean;
}
