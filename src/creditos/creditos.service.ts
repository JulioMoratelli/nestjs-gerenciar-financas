import { Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { CreditoRepository } from './repositories/credito.repository';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { Decimal } from '@prisma/client/runtime';
import { ClientesService } from 'src/clientes/clientes.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CreditosService {
  constructor(
    private readonly repository: CreditoRepository,
    private contaRepository: ContaRepository,
    private clienteService: ClientesService,
  ) {}

  async validate(clienteId: number, id: number) {
    const cliente = await this.clienteService.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const conta = await this.repository.findOne(clienteId, id);
    if (!conta) {
      throw new BadRequestException('Cédito não encontrado');
    }

    if (conta.clienteId !== clienteId) {
      throw new BadRequestException('Crédito não encontrado');
    }
  }

  async atualizarSaldoDaConta(
    clienteId: number,
    contaId: number,
    valor: Decimal,
  ) {
    const conta = await this.contaRepository.findOne(clienteId, contaId);

    const saldoAtual = new Decimal(conta.saldo);
    const novoSaldo = valor.plus(saldoAtual);

    // console.log(novoSaldo);

    await this.contaRepository.updateSaldoConta(contaId, novoSaldo);
    await this.clienteService.atualizarSaldoCliente(clienteId);
  }

  async create(clienteId: number, createCreditoDto: CreateCreditoDto, trx) {
    const cliente = await this.clienteService.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const novoCredito = await this.repository.create(
      clienteId,
      createCreditoDto,
      trx,
    );

    await this.atualizarSaldoDaConta(
      clienteId,
      createCreditoDto.contaId,
      novoCredito.valor,
    );

    return novoCredito;
  }

  async findAll(clienteId: number) {
    const cliente = await this.clienteService.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    return this.repository.findAll(clienteId);
  }

  async findOne(clienteId: number, id: number) {
    await this.validate(clienteId, id);

    return this.repository.findOne(id, clienteId);
  }

  async update(
    id: number,
    clienteId: number,
    updateCreditoDto: UpdateCreditoDto,
    trx,
  ) {
    await this.validate(clienteId, id);

    return this.repository.update(id, clienteId, updateCreditoDto, trx);
  }

  async remove(clienteId: number, id: number, trx) {
    await this.validate(clienteId, id);

    throw new BadRequestException('Impossivel excluir um crédito');

    return this.repository.remove(clienteId, id, trx);

    //e o crédito que já entrou na conta? precisa fazer a engenharia reversa
  }
}
