import { Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { CreditoRepository } from './repositories/credito.repository';

@Injectable()
export class CreditosService {
  constructor(private readonly repository: CreditoRepository) {}

  create(createCreditoDto: CreateCreditoDto) {
    return this.repository.create(createCreditoDto);
  }

  findAll(clienteId: number, id: number) {
    return this.repository.findAll(clienteId, id);
  }

  findOne(clineteId: number, id: number) {
    return this.repository.findOne(id, clineteId);
  }

  update(id: number, clienteId: number, updateCreditoDto: UpdateCreditoDto) {
    return this.repository.update(id, clienteId, updateCreditoDto);
  }

  remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
