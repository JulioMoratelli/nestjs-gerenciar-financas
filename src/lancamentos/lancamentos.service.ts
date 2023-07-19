import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { LancamentosRepository } from './repositories/lancamentos.repository';
import { ParcelasService } from 'src/parcelas/parcelas.service';
import { BadRequestException } from '@nestjs/common';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';

@Injectable()
export class LancamentosService {
  constructor(
    private readonly repository: LancamentosRepository,
    private parcela: ParcelasService,
    private clienteRepository: ClientesRepository,
  ) {}

  async validate(clienteId: number, id: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const lancamento = await this.repository.findOne(clienteId, id);
    if (!lancamento) {
      throw new BadRequestException('lancamento não encontrada.');
    }

    if (lancamento.clienteId !== clienteId) {
      throw new BadRequestException('lancamento não encontrada.');
    }
  }

  async create(
    clienteId: number,
    createLancamentoDto: CreateLancamentoDto,
    trx,
  ) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

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

  async findAll(clienteId: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    return this.repository.findAll(clienteId);
  }

  async findOne(clienteId: number, id: number) {
    await this.validate(clienteId, id);

    return this.repository.findOne(clienteId, id);
  }

  async update(
    clienteId: number,
    id: number,
    updateLancamentoDto: UpdateLancamentoDto,
    trx,
  ) {
    await this.validate(clienteId, id);

    return this.repository.update(clienteId, id, updateLancamentoDto, trx);
  }

  async remove(clienteId: number, id: number, trx) {
    await this.validate(clienteId, id);

    return this.repository.remove(clienteId, id, trx);
  }
}
