import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cliente } from '@prisma/client';
import { ClienteComEnderecoDto } from '../dto/clienteEndereco.dto';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.prisma.cliente.create({
      data: createClienteDto,
    });
    return cliente;
  }

  async createClienteComEndereco(clienteComEnderecoDto: ClienteComEnderecoDto) {
    const { email, cpf, nome, sobrenome } = clienteComEnderecoDto;
    return this.prisma.cliente.create({
      data: {
        email,
        cpf,
        nome,
        sobrenome,
      },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: {
          id,
        },
        include: {
          enderecos: {
            where: {
              padrao: true,
            },
            select: {
              id: true,
              rua: true,
              bairro: true,
              numero: true,
              cidade: true,
            },
          },
        },
      });
      return cliente;
    } catch (err) {}
  }

  async findAllComEndereco(): Promise<Cliente[]> {
    try {
      const clientes = await this.prisma.cliente.findMany({
        where: {
          enderecos: {
            some: {},
          },
        },
        include: {
          enderecos: {
            select: {
              id: true,
              rua: true,
              bairro: true,
              numero: true,
              cidade: true,
            },
          },
        },
      });
      return clientes;
    } catch (err) {}
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    try {
      const cliente = this.prisma.cliente.update({
        where: {
          id,
        },
        data: updateClienteDto,
      });
      return cliente;
    } catch (err) {}
  }

  async updateSaldoCliente(id: number, saldoAtual: Decimal): Promise<Cliente> {
    const cliente = this.prisma.cliente.update({
      where: {
        id,
      },
      data: {
        saldo: saldoAtual,
      },
    });
    return cliente;
  }

  async remove(id: number): Promise<Cliente> {
    try {
      const cliente = this.prisma.cliente.delete({
        where: {
          id,
        },
      });
      return cliente;
    } catch (err) {}
  }
}
