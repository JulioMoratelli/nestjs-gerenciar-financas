import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';
import { ClienteComEnderecoDto } from './../clientes/dto/clienteEndereco.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecosRepository } from './repositories/enderecos.repository';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';

@Injectable()
export class EnderecosService {
  constructor(
    private readonly repository: EnderecosRepository,
    private clienteRepository: ClientesRepository,
  ) {}

  async validate(clienteId: number, id: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const conta = await this.repository.findOne(clienteId, id);
    if (!conta) {
      throw new BadRequestException('Endereço não encontrado');
    }

    if (conta.clienteId !== clienteId) {
      throw new BadRequestException('Endereço não encontrado');
    }
  }

  async create(clienteId: number, createEnderecoDto: CreateEnderecoDto, trx) {
    const cliente = await this.clienteRepository.findOne(clienteId);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    const enderecos = await this.repository.findAll(clienteId);
    const enderecoPadrao = enderecos.find((endereco) => endereco.padrao);

    // no caso, aqui ele PODE cadastrar outro email como padrão.
    // precisa verificar e fazer o que tiver que fazer se tiver que fazer alguma coisa
    // if (createEnderecoDto.padrao && enderecoPadrao) {
    //   throw new BadRequestException('O cliente já possui um endereço padrão');
    // }

    if (createEnderecoDto.padrao == true) {
      if (enderecoPadrao) {
        await this.repository.update(
          clienteId,
          enderecoPadrao.id,
          { padrao: false },
          trx,
        );
      }
    }

    const endereco = await this.repository.create(
      clienteId,
      createEnderecoDto,
      trx,
    );

    return endereco;
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

  async findAll(clienteId: number) {
    return this.repository.findAll(clienteId);
  }

  async findOne(clienteId: number, id: number) {
    await this.validate(clienteId, id);
    return this.repository.findOne(clienteId, id);
  }

  async update(
    clienteId: number,
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
    trx,
  ) {
    await this.validate(clienteId, id);

    const enderecos = await this.repository.findAll(clienteId);
    const enderecoPadrao = enderecos.find((endereco) => endereco.padrao);

    // aqui tbm - ele PODE setar outro endereço como padrão
    // novamente, precisa verificar e fazer o que tiver que fazer...
    // if (updateEnderecoDto.padrao && enderecoPadrao) {
    //   throw new BadRequestException('O cliente já possui um endereço padrão');
    // }

    if (updateEnderecoDto.padrao == true) {
      if (enderecoPadrao) {
        await this.repository.update(
          clienteId,
          enderecoPadrao.id,
          { padrao: false },
          trx,
        );
      }
    }

    return this.repository.update(clienteId, id, updateEnderecoDto, trx);
  }

  async remove(clienteId: number, id: number, trx) {
    await this.validate(clienteId, id);
    return this.repository.remove(clienteId, id, trx);
  }
}
