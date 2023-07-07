import { Credito } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class CreditoEntity implements Credito {
  dataCriado: Date;
  clienteId: number;
  contaId: number;
  valor: Decimal;
  id: number;
}
