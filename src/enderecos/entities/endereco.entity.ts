import { Endereco } from '@prisma/client';

export class EnderecoEntity implements Endereco {
  id: number;
  clienteId: number;
  padrao: boolean;
  rua: string;
  numero: number;
  bairro: string;
  complemento: string;
  cidade: string;
  cep: number;
}
