import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { LancamentoEntity } from 'src/lancamentos/entities/lancamento.entity';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private lancamento: LancamentoEntity,
  ) {}

  async create(createParcelaDto: CreateParcelaDto) {
    return this.repository.create(createParcelaDto);
  }

  async createParcelasComLancamentos() {
    const lancamento = this.lancamento;
    const valorParcela =
      Number(lancamento.valorTotal) / lancamento.numeroParcelas;
    const dataPrimeiraParcela = new Date();

    for (let i = 1; i <= lancamento.numeroParcelas; i++) {
      const vencimentoMensalidade = addDays(dataPrimeiraParcela, 5 * (i - 1));
      const parcela: CreateParcelaDto = {
        lancamentoId: lancamento.id,
        numeroParcela: i,
        valor: new Decimal(valorParcela),
        vencimento: vencimentoMensalidade,
        clienteId: lancamento.clienteId,
        contaId: null,
        pago: false,
      };

      await this.repository.create(parcela);
    }
  }

  async findAll(clienteId: number, lancamentoId: number) {
    await this.createParcelasComLancamentos();
    return this.repository.findAll(clienteId, lancamentoId);
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
}
