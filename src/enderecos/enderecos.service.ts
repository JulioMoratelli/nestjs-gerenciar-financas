import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';
import { ClienteComEnderecoDto } from './../clientes/dto/clienteEndereco.dto';
import { Injectable } from '@nestjs/common';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecosRepository } from './repositories/enderecos.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly repository: EnderecosRepository) {}

  create(createEnderecoDto: CreateEnderecoDto) {
    return this.repository.create(createEnderecoDto);
  }

  createComCliente(
    clienteComEnderecoDto: ClienteComEnderecoDto,
    clienteIndex: number,
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
      clienteId: clienteIndex,
      padrao: true,
    };
    return this.repository.create(dadosCreateEndereco);
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

  remove(clienteId: number, id: number) {
    return this.repository.remove(clienteId, id);
  }
}
