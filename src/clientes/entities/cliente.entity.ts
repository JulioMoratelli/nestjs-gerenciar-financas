import { Cliente } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Exclude } from 'class-transformer';

export class ClientesEntity implements Cliente {
  dataCriado: Date;
  dataAlterado: Date;
  id: number;
  email: string;
  cpf: string;
  saldo: Decimal;

  @Exclude()
  nome: string;

  @Exclude()
  sobrenome: string;

  constructor(data?: Partial<ClientesEntity>) {
    Object.assign(this, data);
  }
}
