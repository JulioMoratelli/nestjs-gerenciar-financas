import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecosRepository } from './repositories/enderecos.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly repository: EnderecosRepository) {}

  create(createEnderecoDto: CreateEnderecoDto) {
    return this.repository.create(createEnderecoDto);
  }

  findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  findOne(clienteId: number, id: number) {
    return this.repository.findOne(clienteId, id);
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return this.repository.update(id, updateEnderecoDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
