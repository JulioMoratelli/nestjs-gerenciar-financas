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
    try {
      return await this.prisma.$transaction(async (trx) => {
        const cliente = trx.cliente.create({
          data: {
            ...data,
          },
        });
        return cliente;
      });
    } catch (Error) {
      throw new Error('dados invalidos');
    }
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
    try {
      return await this.prisma.$transaction(async (trx) => {
        const cliente = trx.cliente.update({
          where: {
            id,
          },
          data: updateClienteDto,
        });
        return cliente;
      });
    } catch (Error) {
      throw new Error('dados invalidos');
    }
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
