import { Cliente } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Exclude } from 'class-transformer';

export class ClientesEntity implements Cliente {
  id: number;
  email: string;
  cpf: string;
  saldo: Decimal;

  @Exclude()
  nome: string;

  @Exclude()
  sobrenome: string;
}
