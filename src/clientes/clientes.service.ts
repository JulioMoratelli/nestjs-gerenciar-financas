import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { ContasService } from 'src/contas/contas.service';
import { Decimal } from '@prisma/client/runtime';
import { ClientesEntity } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    private readonly repository: ClientesRepository,
    private contasService: ContasService,
    private clienteEntity: ClientesEntity,
  ) {}

  async somaSaldoUsuario(clienteId: number) {
    const contas = await this.contasService.findAll(clienteId);
    let resultadoSaldoContas: Decimal = new Decimal(0) as Decimal;

    for (const conta of contas) {
      resultadoSaldoContas = resultadoSaldoContas.plus(
        new Decimal(conta.saldo) as Decimal,
      );
    }

    await this.repository.updateSaldo(
      clienteId,
      resultadoSaldoContas.toNumber(),
    );
  }

  create(createClienteDto: CreateClienteDto) {
    const validarCpf = cpf.isValid(createClienteDto.cpf);
    const validarCnpj = cnpj.isValid(createClienteDto.cpf);

    if (!validarCpf && !validarCnpj) {
      throw new Error('cpf ou cnpj invalido');
    }

    return this.repository.create(createClienteDto);
  }

  async findOne(id: number, clienteId: number) {
    await this.somaSaldoUsuario(clienteId);
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
