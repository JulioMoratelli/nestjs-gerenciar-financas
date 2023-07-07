import { Lancamento } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class LancamentoEntity implements Lancamento {
  dataCriado: Date;
  dataAlterado: Date;
  valorTotal: Decimal;
  numeroParcelas: number;
  status: string;
  id: number;
  clienteId: number;
  descricao: string;
}
