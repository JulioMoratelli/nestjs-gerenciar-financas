import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { cpf } from 'cpf-cnpj-validator';
import { Decimal } from '@prisma/client/runtime';
import { ContaRepository } from 'src/contas/repositories/conta.repository';

@Injectable()
export class ClientesService {
  constructor(
    private readonly repository: ClientesRepository,
    private contasRepository: ContaRepository,
  ) {}

  async atualizarSaldoCliente(clienteId: number): Promise<void> {
    const contas = await this.contasRepository.findAll(clienteId);

    console.log(contas);
    const saldoAtual = contas.reduce((acumulado, conta) => {
      const valorConta = new Decimal(conta.saldo);
      return new Decimal(acumulado).add(valorConta);
    }, new Decimal(0));

    await this.repository.updateSaldo(clienteId, saldoAtual);
  }

  create(createClienteDto: CreateClienteDto) {
    const validarCpf = cpf.isValid(createClienteDto.cpf);

    if (!validarCpf) {
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
    await this.atualizarSaldoCliente(id);
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
