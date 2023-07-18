import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';
import { ClienteComEnderecoDto } from './../clientes/dto/clienteEndereco.dto';
import { Injectable } from '@nestjs/common';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecosRepository } from './repositories/enderecos.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly repository: EnderecosRepository) {}

  create(clienteId: number, createEnderecoDto: CreateEnderecoDto, trx) {
    return this.repository.create(clienteId, createEnderecoDto, trx);
  }

  createComCliente(
    clienteIndex: number,
    clienteComEnderecoDto: ClienteComEnderecoDto,
    trx,
  ) {
    const { cep, rua, numero, bairro, complemento, cidade } =
      clienteComEnderecoDto;

    const dadosCreateEndereco = {
      cep,
      rua,
      numero,
      bairro,
      complemento,
      cidade,
      padrao: true,
    };
    return this.repository.create(clienteIndex, dadosCreateEndereco, trx);
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
    updateEnderecoDto: UpdateEnderecoDto,
    trx,
  ) {
    return this.repository.update(clienteId, id, updateEnderecoDto, trx);
  }

  remove(clienteId: number, id: number, trx) {
    return this.repository.remove(clienteId, id, trx);
  }
}
