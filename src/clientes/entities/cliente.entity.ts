import { Cliente, Prisma } from '@prisma/client';

export class Clientes implements Cliente {
  id: number;
  email: string;
  cpf: number;
  nome: string;
  sobrenome: string;
  saldo: Prisma.Decimal;
}
