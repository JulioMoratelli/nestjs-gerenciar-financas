import { ContaRepository } from './../contas/repositories/conta.repository';
import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';
import { ContaEntity } from 'src/contas/entities/conta.entity';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private contaEntity: ContaEntity,
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
    return this.repository.update(
      clienteId,
      lancamentoId,
      id,
      updateParcelaDto,
    );
  }

  async remove() {
    throw new Error('A parcela não pode ser excluida');
  }

  async pagarParcela(clienteId: number, id: number, contaId: number) {
    const parcela = await this.repository.findOne(clienteId, id);
    if (!parcela) {
      throw new Error('Parcela não existe');
    }
    if (parcela.pago) {
      throw new Error('Parcela já foi paga');
    }
    console.log(parcela);

    const conta = await this.contaRepository.findOne(clienteId, contaId);
    if (!conta) {
      throw new Error('Conta não existe');
    }
    console.log(conta);

    const novoSaldo = Number(conta.saldo) - Number(parcela.valor);
    console.log(novoSaldo);

    await this.contaRepository.updateSaldoConta(
      contaId,
      new Decimal(novoSaldo),
    );

    await this.repository.update(parcela.clienteId, parcela.lancamentoId, id, {
      pago: true,
      contaId,
      vencimento: parcela.vencimento,
      valor: new Decimal(novoSaldo),
    });
  }

  // async identificarReversao(clienteId: number, id: number) {
  //   const parcela = await this.repository.findOne(clienteId, id);
  //   const conta = await this.contaRepository.findOne(contaId);
  //   const novoSaldo = Number(conta.saldo);
  // }
}
