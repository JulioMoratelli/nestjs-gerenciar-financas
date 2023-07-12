import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { Decimal } from '@prisma/client/runtime';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { Cliente } from '@prisma/client';
import { ClienteComEnderecoDto } from './dto/clienteEndereco.dto';
import { EnderecosService } from 'src/enderecos/enderecos.service';

@Injectable()
export class ClientesService {
  constructor(
    private readonly repository: ClientesRepository,
    private contasRepository: ContaRepository,
    private enderecoService: EnderecosService,
    private clinteDto: CreateClienteDto,
  ) {}

  async atualizarSaldoCliente(clienteId: number): Promise<void> {
    const contas = await this.contasRepository.findAll(clienteId);

    // console.log(contas);
    let saldoAtual = new Decimal(0);

    for (let i = 0; i < contas.length; i++) {
      const valorConta = new Decimal(contas[i].saldo);
      saldoAtual = saldoAtual.plus(valorConta);
    }

    await this.repository.updateSaldoCliente(clienteId, saldoAtual);
  }

  async create(createClienteDto: CreateClienteDto) {
    const cliente = await this.repository.create(createClienteDto);
    return cliente;
  }

  async clienteComEndereco(clienteComEnderecoDto: ClienteComEnderecoDto) {
    const { email, cpf, nome, sobrenome } = clienteComEnderecoDto;
    const dadosCreateCliente = { email, cpf, nome, sobrenome };
    const cliente = await this.repository.create(dadosCreateCliente);

    if (dadosCreateCliente === this.clinteDto) {
      return cliente;
    }

    if (!dadosCreateCliente) {
      const clienteIndex = cliente.id;

      const endereco = await this.enderecoService.createComCliente(
        clienteComEnderecoDto,
        clienteIndex,
      );

      return endereco;
    }
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async findAllClienteEndereco(id: number): Promise<Cliente[]> {
    await this.repository.findOne(id);
    return this.repository.findAllComEndereco();
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.repository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
