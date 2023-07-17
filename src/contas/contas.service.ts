import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContaRepository } from './repositories/conta.repository';

@Injectable()
export class ContasService {
  constructor(private readonly repository: ContaRepository) {}

  create(clienteId: number, createContaDto: CreateContaDto, trx) {
    return this.repository.create(clienteId, createContaDto, trx);
  }

  findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  findOne(clienteId: number, id: number) {
    return this.repository.findOne(clienteId, id);
  }

  update(clienteId: number, id: number, updateContaDto: UpdateContaDto, trx) {
    return this.repository.update(clienteId, id, updateContaDto, trx);
  }

  remove(clienteId: number, id: number, trx) {
    return this.repository.remove(clienteId, id, trx);
  }
}
