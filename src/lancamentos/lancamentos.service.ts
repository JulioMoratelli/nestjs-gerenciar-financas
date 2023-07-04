import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { LancamentosRepository } from './repositories/lancamentos.repository';

@Injectable()
export class LancamentosService {
  constructor(private readonly repository: LancamentosRepository) {}

  async create(createLancamentoDto: CreateLancamentoDto) {
    const lancamento = await this.repository.create(createLancamentoDto);
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
  ) {
    return this.repository.update(clienteId, id, updateLancamentoDto);
  }

  remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
