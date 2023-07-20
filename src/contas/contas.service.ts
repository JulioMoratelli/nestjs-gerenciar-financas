import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContaRepository } from './repositories/conta.repository';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';
import { ParcelasRepository } from 'src/parcelas/repository/parcelas.repository';
import { CreditoRepository } from 'src/creditos/repositories/credito.repository';

@Injectable()
export class ContasService {
  constructor(
    private readonly repository: ContaRepository,
    private clienteRepository: ClientesRepository,
    private parcelas: ParcelasRepository,
    private credito: CreditoRepository,
  ) {}

  async validate(clienteId: number, id: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const conta = await this.repository.findOne(clienteId, id);
    if (!conta) {
      throw new BadRequestException('Conta não encontrada.');
    }

    if (conta.clienteId !== clienteId) {
      throw new BadRequestException('Conta não encontrada.');
    }
  }

  async create(clienteId: number, createContaDto: CreateContaDto, trx) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const contas = await this.repository.findAll(clienteId);

    const nomeContaJaExistente = contas.some(
      (conta) => conta.nome === createContaDto.nome,
    );
    if (nomeContaJaExistente) {
      throw new BadRequestException(
        'Já existe uma conta cadastrada com esse nome',
      );
    }

    return this.repository.create(clienteId, createContaDto, trx);
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
    updateContaDto: UpdateContaDto,
    trx,
  ) {
    await this.validate(clienteId, id);

    const contas = await this.repository.findAll(clienteId);

    const nomeContaJaExistente = contas.some(
      (conta) => conta.nome === updateContaDto.nome,
    );
    if (nomeContaJaExistente) {
      throw new BadRequestException(
        'Já existe uma conta cadastrada com esse nome',
      );
    }

    return this.repository.update(clienteId, id, updateContaDto, trx);
  }

  async remove(clienteId: number, id: number, trx) {
    await this.validate(clienteId, id);

    const existeLancamentos = await this.parcelas.findOne(clienteId, id);
    const existeCreditos = await this.credito.findOne(clienteId, id);

    if (existeLancamentos || existeCreditos) {
      throw new BadRequestException(
        'Conta vinculada em outras partes do sistema',
      );
    }

    return this.repository.remove(clienteId, id, trx);
  }
}
