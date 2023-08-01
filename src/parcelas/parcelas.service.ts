import { ContaRepository } from './../contas/repositories/conta.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { ParcelasRepository } from './repository/parcelas.repository';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { LancamentosRepository } from 'src/lancamentos/repositories/lancamentos.repository';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private contaRepository: ContaRepository,
    private clienteRepository: ClientesRepository,
    private lancamentoRepository: LancamentosRepository,
  ) {}

  async createParcelasComLancamento(
    clienteId: number,
    lancamentoId: number,
    numeroParcela: number,
    valor: Decimal,
    primeiraParcela: Date,
    trx,
  ) {
    const valorParcela = Number(valor) / numeroParcela;
    // faltou pegar a data informada como primeira parcela no lançamento
    const dataPrimeiraParcela = primeiraParcela;

    for (let i = 1; i <= numeroParcela; i++) {
      const vencimentoMensalidade = addDays(dataPrimeiraParcela, 30 * (i - 1));
      const parcela: CreateParcelaDto = {
        lancamentoId: lancamentoId,
        numeroParcela: numeroParcela,
        valor: new Decimal(valorParcela),
        vencimento: vencimentoMensalidade,
        contaId: null,
        pago: false,
      };
      await this.repository.create(clienteId, parcela, trx);
    }
  }

  async findAll(
    clienteId: number,
    periodo?: { deData: Date; ateData: Date },
    status?: boolean,
  ) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    // faltou validar se caso informado o período existam as duas datas
    if (periodo && (!periodo.deData || !periodo.ateData)) {
      throw new BadRequestException('Informe as duas datas que deseja filtrar');
    }

    return this.repository.findAll(clienteId, periodo, status);
  }

  async findOne(clienteId: number, id: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    return this.repository.findOne(clienteId, id);
  }

  async update(
    clienteId: number,
    id: number,
    updateParcelaDto: UpdateParcelaDto,
    trx,
  ) {
    const parcela = await this.repository.findOne(clienteId, id);
    const { contaId } = updateParcelaDto;
    const conta = await this.contaRepository.findOne(clienteId, contaId);

    if (!parcela) {
      throw new BadRequestException('Parcela não encontrada');
    }

    if (parcela.pago) {
      throw new BadRequestException('não é possivel alterar uma parcela paga');
    }

    if (!conta) {
      throw new BadRequestException('Conta não existe');
    }

    // const atualizarParcela = this.repository.update(
    //   clienteId,
    //   id,
    //   contaId,
    //   trx,
    // );

    if (updateParcelaDto.pago === true) {
      await this.IdentificandoPagamento(clienteId, id, contaId, trx);
    } else if (updateParcelaDto.pago === false) {
      await this.identificarReversao(
        clienteId,
        id,
        updateParcelaDto.contaId,
        trx,
      );
    }
  }

  async IdentificandoPagamento(
    clienteId: number,
    id: number,
    contaId: number,
    trx,
  ) {
    const parcela = await this.repository.findOne(clienteId, id);

    if (!parcela) {
      throw new BadRequestException('Parcela não existe');
    }

    if (parcela.pago) {
      throw new BadRequestException('Essa parcela esta paga');
    }

    const conta = await this.contaRepository.findOne(clienteId, contaId);

    if (!conta) {
      throw new BadRequestException('conta não existe');
    }

    await this.contaRepository.removendoValorSaldoConta(contaId, parcela.valor);

    const statusParcela = true;

    // const updateParcelaRepositoryDto = {
    //   pago: statusParcela,
    //   contaId: contaId,
    //   dataAlterado: new Date(),
    // };

    // faltou mudar a parcela & lançamento
    await this.repository.update(
      clienteId,
      id,
      { pago: statusParcela, contaId: contaId, dataAlterado: new Date() },
      trx,
    );
  }

  async identificarReversao(
    clienteId: number,
    id: number,
    contaId: number,
    trx,
  ) {
    const parcela = await this.repository.findOne(clienteId, id);

    if (!parcela) {
      throw new BadRequestException('Parcela não existe');
    }

    if (!parcela.pago) {
      throw new BadRequestException('Essa parcela não esta paga');
    }

    const conta = await this.contaRepository.findOne(
      clienteId,
      parcela.contaId,
    );

    if (!conta) {
      throw new BadRequestException('conta não existe');
    }

    await this.contaRepository.adicionandoValorSaldoConta(
      contaId,
      parcela.valor,
    );

    const statusParcela = false;

    // faltou mudar a parcela & lçanamento
    await this.repository.update(
      clienteId,
      id,
      {
        pago: statusParcela,
        contaId: contaId,
        dataAlterado: new Date(),
      },
      trx,
    );

    await this.lancamentoRepository.atualizarStatusLancamento(clienteId, );
  }

  // async atualizarStatusLancamento(clienteId: number, lancamentoId: number) {
  //   const lancamentos = await this.lancamento.findOne(clienteId, lancamentoId);

  //   if (!lancamentos) {
  //     throw new BadRequestException('lancamento não encontrado');
  //   }

  //   const parcelas = await this.repository.findAllLancamento(lancamentoId);

  //   const parcelasPagas = parcelas.every((parcela) => parcela.pago);
  //   const parcelasNaoPagas = parcelas.every((parcela) => !parcela.pago);

  //   let statusLancamentos = null;

  //   if (parcelasPagas) {
  //     statusLancamentos = 'PAGO';
  //   } else if (parcelasNaoPagas) {
  //     statusLancamentos = 'DÉBITO';
  //   } else {
  //     statusLancamentos = 'PARCIAL';
  //   }

  //   await this.lancamento.atualizarStatusLancamento(
  //     clienteId,
  //     lancamentoId,
  //     statusLancamentos,
  //   );
  // }
}
