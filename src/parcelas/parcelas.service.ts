import { ContaRepository } from './../contas/repositories/conta.repository';
import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';
import { ContaEntity } from 'src/contas/entities/conta.entity';
import { error } from 'console';

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

  async findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  findOne(clienteId: number, lancamentoId: number, id: number) {
    return this.repository.findOne(clienteId, lancamentoId, id);
  }

  update(
    clienteId: number,
    lancamentoId: number,
    id: number,
    updateParcelaDto: UpdateParcelaDto,
  ) {
    delete updateParcelaDto.valor;
    return this.repository.update(
      clienteId,
      lancamentoId,
      id,
      updateParcelaDto,
    );
  }

  remove() {
    throw new Error('A parcela não pode ser excluida');
  }

  async IdentificandoPagamento(
    clienteId: number,
    lancamentoId: number,
    id: number,
    contaId: number,
  ): Promise<void> {
    const parcela = await this.repository.findOne(clienteId, lancamentoId, id);
    contaId = this.contaEntity.id;
    const valorParcela = parcela.valor;
    const conta = await this.contaRepository.findOne(clienteId, clienteId);
    const novoSaldo = Number(conta.saldo) - Number(valorParcela);

    if (parcela.pago == true) {
      throw new Error('parcela ja foi pago');
    }
    if (!parcela) {
      throw new Error('parcela não existe');
    }

    if (!conta) {
      throw new error('Essa conta não existe');
    }

    await this.contaRepository.updateSaldoConta(
      contaId,
      new Decimal(novoSaldo),
    );

    await this.repository.update(clienteId, lancamentoId, id, {
      pago: true,
      contaId,
      numeroParcela: parcela.numeroParcela,
      vencimento: parcela.vencimento,
      valor: new Decimal(novoSaldo),
    });
  }
}
