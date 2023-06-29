import { Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { CreditoRepository } from './repositories/credito.repository';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { Decimal } from '@prisma/client/runtime';

@Injectable()
export class CreditosService {
  constructor(
    private readonly repository: CreditoRepository,
    private contaRepository: ContaRepository,
  ) {}

  async create(createCreditoDto: CreateCreditoDto) {
    const { contaId, clienteId } = createCreditoDto;
    const novoCredito = await this.repository.create(createCreditoDto);
    const conta = await this.contaRepository.findOne(clienteId, contaId);

    const saldoAtual = new Decimal(conta.saldo);
    const novoSaldo = novoCredito.valor.plus(saldoAtual);

    console.log(novoSaldo);

    await this.contaRepository.updateSaldoConta(contaId, novoSaldo);

    return novoCredito;
  }

  async findAll(clienteId: number, id: number) {
    return this.repository.findAll(clienteId, id);
  }

  async findOne(clineteId: number, id: number) {
    return this.repository.findOne(id, clineteId);
  }

  async update(
    id: number,
    clienteId: number,
    updateCreditoDto: UpdateCreditoDto,
  ) {
    return this.repository.update(id, clienteId, updateCreditoDto);
  }

  async remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
