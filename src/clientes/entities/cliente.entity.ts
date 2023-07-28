import { Cliente } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Exclude, Expose } from 'class-transformer';

interface Endereco {
  rua: string;
  numero: number;
  bairro: string;
  complemento: string;
  cidade: string;
  cep: number;
}
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

  enderecos: Endereco[];

  constructor(data?: Partial<ClientesEntity>) {
    Object.assign(this, data);
  }

  @Expose()
  nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}
