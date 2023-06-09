import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContaRepository } from './repositories/conta.repository';

@Injectable()
export class ContasService {
  constructor(private readonly repository: ContaRepository) {}

  create(createContaDto: CreateContaDto) {
    return this.repository.create(createContaDto);
  }

  findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  findOne(clienteId: number, id: number) {
    return this.repository.findOne(clienteId, id);
  }

  update(clienteId: number, id: number, updateContaDto: UpdateContaDto) {
    return this.repository.update(clienteId, id, updateContaDto);
  }

  remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
