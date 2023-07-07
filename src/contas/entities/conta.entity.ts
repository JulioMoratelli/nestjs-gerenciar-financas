import { Conta } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ContaEntity implements Conta {
  dataCriado: Date;
  dataAlterado: Date;
  id: number;
  clienteId: number;
  nome: string;
  saldo: Decimal;
}
