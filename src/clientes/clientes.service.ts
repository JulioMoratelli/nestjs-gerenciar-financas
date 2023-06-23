import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(
    private readonly repository: ClientesRepository,
    private prisma: PrismaService,
  ) {}

  public async somaSaldoCliente(clienteId: number): Promise<void> {
    const contas = await this.prisma.conta.findMany({
      where: {
        clienteId: clienteId,
      },
    });

    const saldoAtual = contas.reduce((acumulado, conta) => {
      const valorConta = new Decimal(conta.saldo);
      return new Decimal(acumulado).add(valorConta);
    }, new Decimal(0));

    await this.prisma.cliente.update({
      where: { id: clienteId },
      data: { saldo: saldoAtual },
    });

    const clienteAtualizado = await this.repository.findOne(clienteId);
    if (clienteAtualizado) {
      clienteAtualizado.saldo = saldoAtual;
      await clienteAtualizado.save();
    }
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

  async findAllClienteEndereco(id: number, clienteId: number) {
    await this.somaSaldoCliente(clienteId);
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
