import { Parcela } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ParcelaEntity implements Parcela {
  dataCriado: Date;
  dataAlterado: Date;
  id: number;
  clienteId: number;
  lancamentoId: number;
  contaId: number;
  numeroParcela: number;
  vencimento: Date;
  valor: Decimal;
  pago: boolean;
}
