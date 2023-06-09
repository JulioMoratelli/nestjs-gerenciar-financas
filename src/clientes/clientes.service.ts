import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repository/clientes.repository';

@Injectable()
export class ClientesService {
  constructor(private readonly repository: ClientesRepository) {}

  create(createClienteDto: CreateClienteDto) {
    return this.repository.create(createClienteDto);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.repository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
