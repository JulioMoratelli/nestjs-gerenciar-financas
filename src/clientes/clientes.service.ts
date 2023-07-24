import { EnderecosService } from './../enderecos/enderecos.service';
import { ContaRepository } from './../contas/repositories/conta.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesRepository } from './repositories/clientes.repository';
import { Decimal } from '@prisma/client/runtime';
import { Cliente, Prisma } from '@prisma/client';
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

  async validandoEmail(email: string, clienteId?: number) {
    const clientes = await this.repository.findAllComEndereco();

    for (const cliente of clientes) {
      // if (cliente.email === email && cliente.id !== clienteId) {

      // verificar se o clienteId foi informado
      if (cliente.email === email) {
        if (!clienteId || cliente.id !== clienteId) {
          throw new BadRequestException('Esse email já está cadastrado');
        }
      }
    }
  }

  async createClienteComEndereco(
    clienteComEnderecoDto: ClienteComEnderecoDto,
    trx,
  ) {
    const { email, cpf, nome, sobrenome } = clienteComEnderecoDto;
    const dadosCreateCliente = { email, cpf, nome, sobrenome };

    await this.validandoEmail(dadosCreateCliente.email);

    /*
    🗣️ aqui precisa melhorar a validação. pra cadastrar um endereço, apenas o 
    campo "complemento" é opcional. 
    primeiramente vc precisa saber se é preciso validar um endereço, ou seja,
    se qualquer campo de endereço foi informado, e não apenas a "rua".
    ou seja:
    
      1) informou algum dado de endereço?
        -sim) 
          2) valida todos os dados de endereço
          
        -não) continua

    e tbm tá faltando a transécxon 😅
    */

    if (
      clienteComEnderecoDto.rua ||
      clienteComEnderecoDto.numero ||
      clienteComEnderecoDto.bairro ||
      clienteComEnderecoDto.cidade ||
      clienteComEnderecoDto.cep ||
      clienteComEnderecoDto.complemento
    ) {
      if (!clienteComEnderecoDto.rua) {
        throw new BadRequestException('A informação rua esta faltando');
      }

      if (!clienteComEnderecoDto.numero) {
        throw new BadRequestException('A informação numero esta faltando');
      }

      if (!clienteComEnderecoDto.bairro) {
        throw new BadRequestException('A informação bairro esta faltando');
      }

      if (!clienteComEnderecoDto.cidade) {
        throw new BadRequestException('A informação cidade esta faltando');
      }

      if (!clienteComEnderecoDto.cep) {
        throw new BadRequestException('A informação cep esta faltando');
      }

      const cliente = await this.repository.create(dadosCreateCliente, trx);

      const endereco = await this.enderecoService.createComCliente(
        cliente.id,
        clienteComEnderecoDto,
        trx,
      );

      return { cliente, endereco };
    }

    const cliente = await this.repository.create(dadosCreateCliente, trx);
    return cliente;
  }

  async findOne(id: number) {
    const cliente = await this.repository.findOne(id);

    if (!cliente) {
      throw new BadRequestException('Esse cliente não existe');
    }

    return cliente;
  }

  async findAllClienteEndereco(): Promise<Cliente[]> {
    return this.repository.findAllComEndereco();
  }

  /*
  🗣️ aqui provavelmente sempre vai dar um erro no método validandoEmail()
      qdo o usuário não alterar o email.
      uma maneira de resolver isso seria acrescentar um segundo parâmetro
      opcional "clienteId" e caso ele exista, validar só nos clientes que não sejam esse.
      o método opcional permitiria vc usar o método tanto pra novos clientes qto pra alteração de clientes.
  */
  async update(id: number, updateClienteDto: UpdateClienteDto, trx) {
    const cliente = await this.repository.findOne(id);

    if (!cliente) {
      throw new BadRequestException('Cliente não existe');
    }

    // cliente.dataAlterado = new Date(now());

    // if (cliente.email !== updateClienteDto.email) {
    // precisa verificar se o email existe pq não é obrigatório
    if (updateClienteDto.email && cliente.email !== updateClienteDto.email) {
      // faltou passar o cliente.id
      await this.validandoEmail(updateClienteDto.email, cliente.id);
    }

    return this.repository.update(id, updateClienteDto, trx);
  }

  async remove(id: number, trx: Prisma.TransactionClient) {
    const cliente = await this.repository.findOne(id);

    if (!cliente) {
      throw new BadRequestException('Cliente não existe');
    }

    return this.repository.remove(id, trx);
  }
}
