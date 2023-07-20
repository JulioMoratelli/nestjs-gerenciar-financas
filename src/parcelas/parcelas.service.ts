import { ContaRepository } from './../contas/repositories/conta.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repository/parcelas.repository';
import { Decimal } from '@prisma/client/runtime';
import { addDays } from 'date-fns';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';

@Injectable()
export class ParcelasService {
  constructor(
    private readonly repository: ParcelasRepository,
    private contaRepository: ContaRepository,
    private clienteRepository: ClientesRepository,
  ) {}

  async createParcelasComLancamento(
    clienteId: number,
    lancamentoId: number,
    numeroParcela: number,
    valor: Decimal,
    trx,
  ) {
    const valorParcela = Number(valor) / numeroParcela;
    // faltou pegar a data informada como primeira parcela no lançamento
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
    lancamentoId: number,
    id: number,
    updateParcelaDto: UpdateParcelaDto,
    trx,
  ) {
    const parcela = await this.repository.findOne(clienteId, id);

    if (!parcela) {
      throw new BadRequestException('Parcela não encontrada');
    }

    if (parcela.pago) {
      throw new Error('não é possivel alterar uma parcela paga');
    }

    delete updateParcelaDto.valor;
    const atualizarParcela = this.repository.update(
      clienteId,
      lancamentoId,
      id,
      updateParcelaDto,
      trx,
    );

    // a regra de pagar/despagar uma parcela não deve ser feita no update da parcela,
    // e sim apenas nos métodos exclusivos pra isso

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

    // console.log(parcela);
    // console.log(conta);
    // console.log(novoSaldo);

    if (!parcela) {
      throw new BadRequestException('Parcela não existe');
    } else if (parcela.pago) {
      throw new BadRequestException('Parcela já foi paga');
    } else if (!conta) {
      throw new BadRequestException('Conta não existe');
    }

    const novoSaldo = Number(conta.saldo) - Number(parcela.valor);

    await this.contaRepository.updateSaldoConta(
      contaId,
      new Decimal(novoSaldo),
    );

    // faltou mudar a parcela & lançamento
  }

  async identificarReversao(clienteId: number, id: number) {
    const parcela = await this.repository.findOne(clienteId, id);

    if (!parcela) {
      throw new BadRequestException('Parcela não existe');
    }

    if (!parcela.pago) {
      throw new BadRequestException('Essa parcela não esta paga');
    }

    // esse if não precisaria ser feito pq teoricamente se a parcela tem uma conta_id e não está
    // paga, algo mto errado já aconteceu antes 😅
    if (!parcela.contaId) {
      throw new BadRequestException('Não foi informado uma conta');
    }

    const conta = await this.contaRepository.findOne(
      clienteId,
      parcela.contaId,
    );

    if (!conta) {
      throw new BadRequestException('conta não existe');
    }

    const novoSaldo = Number(conta.saldo) + Number(parcela.valor);

    await this.contaRepository.updateSaldoConta(
      parcela.clienteId,
      new Decimal(novoSaldo),
    );

    // faltou mudar a parcela & lançamento
  }
}
