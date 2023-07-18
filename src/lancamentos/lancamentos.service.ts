import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { LancamentosRepository } from './repositories/lancamentos.repository';
import { ParcelasService } from 'src/parcelas/parcelas.service';

@Injectable()
export class LancamentosService {
  constructor(
    private readonly repository: LancamentosRepository,
    private parcela: ParcelasService,
  ) {}

  async create(
    clienteId: number,
    createLancamentoDto: CreateLancamentoDto,
    trx,
  ) {
    const lancamento = await this.repository.create(
      clienteId,
      createLancamentoDto,
      trx,
    );

    if (lancamento) {
      const { id, numeroParcelas, valorTotal, clienteId } = lancamento;

      await this.parcela.createParcelasComLancamento(
        clienteId,
        id,
        numeroParcelas,
        valorTotal,
        trx,
      );
    }

    console.log(lancamento);

    return lancamento;
  }

  findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  findOne(clienteId: number, id: number) {
    return this.repository.findOne(clienteId, id);
  }

  update(
    clienteId: number,
    id: number,
    updateLancamentoDto: UpdateLancamentoDto,
    trx,
  ) {
    return this.repository.update(clienteId, id, updateLancamentoDto, trx);
  }

  remove(clienteId: number, id: number, trx) {
    return this.repository.remove(clienteId, id, trx);
  }
}
