import { Credito } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class CreditoEntity implements Credito {
  clienteId: number;
  contaId: number;
  valor: Decimal;
  id: number;
  email: string;
}
