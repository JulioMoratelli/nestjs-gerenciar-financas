import { Cliente } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ClientesEntity implements Cliente {
  id: number;
  email: string;
  cpf: number;
  nome: string;
  sobrenome: string;
  saldo: Decimal;
}
