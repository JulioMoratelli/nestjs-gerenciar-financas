import { Injectable } from '@nestjs/common';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { Decimal } from '@prisma/client/runtime';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { Cliente } from '@prisma/client';
import { EnderecosService } from 'src/enderecos/enderecos.service';
import { ClienteComEnderecoDto } from './dto/clienteEndereco.dto';

@Injectable()
export class ClientesService {
  constructor(
    private readonly repository: ClientesRepository,
    private contasRepository: ContaRepository,
    private enderecoService: EnderecosService,
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

  async clienteComEndereco(clienteComEnderecoDto: ClienteComEnderecoDto) {
    const { email, cpf, nome, sobrenome } = clienteComEnderecoDto;
    const dadosCreateCliente = { email, cpf, nome, sobrenome };

    if (clienteComEnderecoDto.rua) {
      const cliente = await this.repository.create(dadosCreateCliente);
      const clienteIndex = cliente.id;

      const endereco = await this.enderecoService.createComCliente(
        clienteComEnderecoDto,
        clienteIndex,
      );

      return { cliente, endereco };
    }

    const cliente = await this.repository.create(dadosCreateCliente);
    return cliente;
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
