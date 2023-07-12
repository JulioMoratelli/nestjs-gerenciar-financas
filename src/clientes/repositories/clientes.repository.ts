import { Injectable } from '@nestjs/common';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    // createClienteDto: CreateClienteDto,
    data: Prisma.ClienteUncheckedCreateInput,
  ): Promise<Cliente> {
    const cliente = this.prisma.cliente.create({
      data: {
        ...data,
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
  ): Promise<Cliente> {
    const cliente = this.prisma.cliente.update({
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

  async remove(id: number): Promise<Cliente> {
    const cliente = this.prisma.cliente.delete({
      where: {
        id,
      },
    });
    return cliente;
  }
}
