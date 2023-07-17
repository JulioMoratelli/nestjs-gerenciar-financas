import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Decimal } from '@prisma/client/runtime';
import { Cliente, Prisma } from '@prisma/client';
import { CreateClienteDto } from '../dto/create-cliente.dto';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createClienteDto: CreateClienteDto,
    trx: Prisma.TransactionClient,
  ): Promise<Cliente> {
    const cliente = trx.cliente.create({
      data: {
        ...createClienteDto,
      },
    });
    return cliente;
  }

  async findOne(id: number): Promise<Cliente> {
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
  }

  async findAllComEndereco(): Promise<Cliente[]> {
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
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
    trx: Prisma.TransactionClient,
  ): Promise<Cliente> {
    const cliente = trx.cliente.update({
      where: {
        id,
      },
      data: updateClienteDto,
    });
    return cliente;
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

  async remove(id: number, trx: Prisma.TransactionClient): Promise<Cliente> {
    const cliente = trx.cliente.delete({
      where: {
        id,
      },
    });
    return cliente;
  }
}
