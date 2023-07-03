import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { LancamentosRepository } from 'src/lancamentos/repositories/lancamentos.repository';
import { Decimal } from '@prisma/client/runtime';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private lancamentoRepository: LancamentosRepository,
  ) {}

  async create(createParcelaDto: CreateParcelaDto) {
    const { clienteId, lancamentoId } = createParcelaDto;
    const numeroParcela = createParcelaDto.numeroParcela;
    const lancamento = await this.lancamentoRepository.findOne(
      clienteId,
      lancamentoId,
    );
    const valorLancamento = Number(lancamento.valorTotal);
    const resultParcelado = valorLancamento / numeroParcela;

    const parcelas: CreateParcelaDto[] = [];

    for (let i = 0; i < numeroParcela; i++) {
      const parcela: CreateParcelaDto = {
        clienteId,
        lancamentoId,
        valor: new Decimal(resultParcelado),
        vencimento: new Date(createParcelaDto.vencimento.getTime()),
        contaId: null,
        numeroParcela: i + 1,
        pago: false,
      };
      parcelas.push(parcela);

      parcela.vencimento.setMonth(parcela.vencimento.getMonth() + 1);
    }

    return this.repository.createMany(parcelas);
  }

  findAll(clienteId: number, lancamentoId: number) {
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
    return this.repository.update(
      clienteId,
      lancamentoId,
      id,
      updateParcelaDto,
    );
  }

  remove(clienteId: number, lancamentoId: number, id: number) {
    return this.repository.remove(clienteId, lancamentoId, id);
  }
}
