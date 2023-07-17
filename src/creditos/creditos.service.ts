import { Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { CreditoRepository } from './repositories/credito.repository';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { Decimal } from '@prisma/client/runtime';
import { ClientesService } from 'src/clientes/clientes.service';

@Injectable()
export class CreditosService {
  constructor(
    private readonly repository: CreditoRepository,
    private contaRepository: ContaRepository,
    private clienteService: ClientesService,
  ) {}

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
    return this.repository.findAll(clienteId);
  }

  async findOne(clineteId: number, id: number) {
    return this.repository.findOne(id, clineteId);
  }

  async update(
    id: number,
    clienteId: number,
    updateCreditoDto: UpdateCreditoDto,
    trx,
  ) {
    return this.repository.update(id, clienteId, updateCreditoDto, trx);
  }

  async remove(clienteId: number, id: number, trx) {
    return this.repository.remove(clienteId, id, trx);
  }
}
