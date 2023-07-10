import { ContaRepository } from './../contas/repositories/conta.repository';
import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './parcelas.repository';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private contaRepository: ContaRepository,
  ) {}

  async createParcelasComLancamento(
    clienteId: number,
    lancamentoId: number,
    numeroParcela: number,
    valor: Decimal,
  ) {
    const valorParcela = Number(valor) / numeroParcela;
    const dataPrimeiraParcela = new Date();

    for (let i = 1; i <= numeroParcela; i++) {
      const vencimentoMensalidade = addDays(dataPrimeiraParcela, 5 * (i - 1));
      const parcela: CreateParcelaDto = {
        lancamentoId: lancamentoId,
        numeroParcela: numeroParcela,
        valor: new Decimal(valorParcela),
        vencimento: vencimentoMensalidade,
        contaId: null,
        pago: false,
        clienteId: clienteId,
      };
      await this.repository.create(parcela);
    }
  }

  async findAll(
    clienteId: number,
    periodo?: { deData: Date; ateData: Date },
    status?: boolean,
  ) {
    return this.repository.findAll(clienteId, periodo, status);
  }

  async findOne(clienteId: number, id: number) {
    return this.repository.findOne(clienteId, id);
  }

  async update(
    clienteId: number,
    lancamentoId: number,
    id: number,
    updateParcelaDto: UpdateParcelaDto,
  ) {
    const parcela = await this.repository.findOne(clienteId, id);

    if (parcela.pago) {
      throw new Error('não é possivel alterar uma parcela paga');
    }

    delete updateParcelaDto.valor;
    const atualizarParcela = this.repository.update(
      clienteId,
      lancamentoId,
      id,
      updateParcelaDto,
    );

    if (updateParcelaDto.pago === true) {
      await this.IdentificandoPagamento(
        clienteId,
        id,
        updateParcelaDto.contaId,
      );
    } else if (updateParcelaDto.pago === false) {
      await this.identificarReversao(clienteId, id);
    }

    return atualizarParcela;
  }

  async remove() {
    throw new Error('A parcela não pode ser excluida');
  }

  async IdentificandoPagamento(clienteId: number, id: number, contaId: number) {
    const parcela = await this.repository.findOne(clienteId, id);
    const conta = await this.contaRepository.findOne(clienteId, contaId);
    const novoSaldo = Number(conta.saldo) - Number(parcela.valor);
    console.log(parcela);
    console.log(conta);
    console.log(novoSaldo);

    if (parcela.pago) {
      throw new Error('');
    }

    if (!parcela) {
      throw new Error('Parcela não existe');
    } else if (parcela.pago) {
      throw new Error('Parcela já foi paga');
    } else if (!conta) {
      throw new Error('Conta não existe');
    }

    await this.contaRepository.updateSaldoConta(
      contaId,
      new Decimal(novoSaldo),
    );
  }

  async identificarReversao(clienteId: number, id: number) {
    const parcela = await this.repository.findOne(clienteId, id);
    const conta = await this.contaRepository.findOne(
      clienteId,
      parcela.contaId,
    );
    const novoSaldo = Number(conta.saldo) + Number(parcela.valor);

    if (!parcela.pago) {
      throw new Error('essa parcela não esta paga');
    } else if (!parcela.contaId) {
      throw new Error('parcela não possui uma conta associada');
    } else if (!conta) {
      throw new Error('conta não existe');
    }

    await this.contaRepository.updateSaldoConta(
      parcela.clienteId,
      new Decimal(novoSaldo),
    );
  }
}
