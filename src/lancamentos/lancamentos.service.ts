import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { LancamentosRepository } from './repositories/lancamentos.repository';
import { CreateParcelaDto } from 'src/parcelas/dto/create-parcela.dto';
import { Decimal } from '@prisma/client/runtime';
import { ParcelasRepository } from 'src/parcelas/repositories/parcelas.repository';

@Injectable()
export class LancamentosService {
  constructor(
    private readonly repository: LancamentosRepository,
    private parcelasRepository: ParcelasRepository,
  ) {}

  async create(
    createLancamentoDto: CreateLancamentoDto,
    createParcelaDto: CreateParcelaDto,
  ) {
    const { clienteId, lancamentoId } = createParcelaDto;

    // Crie o lançamento
    const lancamento = await this.repository.create(createLancamentoDto);

    // Crie as parcelas usando a lógica existente
    const parcelas = await this.createParcelas(
      clienteId,
      lancamentoId,
      createParcelaDto,
    );

    return { lancamento, parcelas };
  }

  private async createParcelas(
    clienteId: number,
    lancamentoId: number,
    createParcelaDto: CreateParcelaDto,
  ) {
    const numeroParcela = createParcelaDto.numeroParcela;
    const valorLancamento = createParcelaDto.valor;
    const resultParcelado = Number(valorLancamento) / numeroParcela;

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

    return this.parcelasRepository.createMany(parcelas);
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
  ) {
    return this.repository.update(clienteId, id, updateLancamentoDto);
  }

  remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
