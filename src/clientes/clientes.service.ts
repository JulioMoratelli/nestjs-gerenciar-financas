import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { Decimal } from '@prisma/client/runtime';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { ContaEntity } from 'src/contas/entities/conta.entity';
import { Conta } from '@prisma/client';

export interface ClientesExtendedEntity extends ContaEntity {
  conta: Conta[];
}

@Injectable()
export class ClientesService {
  constructor(private readonly repository: ClientesRepository) {}

  async SomaSaldoContas(id: number): Promise<void> {
    const cliente = await this.repository.findOne(id);
    const contas = cliente.conta;
    let result = new Decimal(0);

    contas.forEach((conta) => {
      const saldoDecimal = new Decimal(conta.saldo);
      result = result.add(saldoDecimal);
    });

    cliente.saldo = result;
    await this.repository.update(id, cliente);
  }

  create(createClienteDto: CreateClienteDto) {
    const validarCpf = cpf.isValid(createClienteDto.cpf);
    const validarCnpj = cnpj.isValid(createClienteDto.cpf);

    if (!validarCpf && !validarCnpj) {
      throw new Error('cpf ou cnpj invalido');
    }

    return this.repository.create(createClienteDto);
  }

  async findOne(id: number) {
    const cliente = await this.repository.findOne(id);
    if (cliente) {
      const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
      return { ...cliente, nomeCompleto };
    }
    return null;
  }

  async findAllClienteEndereco(id: number) {
    const cliente = await this.repository.findOne(id);
    if (cliente) {
      const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
      return { ...cliente, nomeCompleto };
    }
    return this.repository.findAllComEndereco();
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.repository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
