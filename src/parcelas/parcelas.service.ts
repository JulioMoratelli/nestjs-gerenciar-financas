import { Injectable } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { ParcelasRepository } from './repositories/parcelas.repository';

@Injectable()
export class ParcelasService {
  constructor(private readonly repository: ParcelasRepository) {}

  async create(createParcelaDto: CreateParcelaDto) {
    return this.repository.create(createParcelaDto);
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
