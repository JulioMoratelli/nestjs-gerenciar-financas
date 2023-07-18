import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { EnderecoEntity } from '../entities/endereco.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnderecosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    cliente: number,
    createEnderecoDto: CreateEnderecoDto,
    trx: Prisma.TransactionClient,
  ): Promise<EnderecoEntity> {
    const enderecoCreateInput: Prisma.EnderecoCreateInput = {
      ...createEnderecoDto,
      cliente: { connect: { id: cliente } },
    };

    return trx.endereco.create({
      data: enderecoCreateInput,
    });
  }

  async findAll(clienteId: number): Promise<EnderecoEntity[]> {
    return await this.prisma.endereco.findMany({
      where: {
        clienteId,
      },
    });
  }

  async findOne(clienteId: number, id: number): Promise<EnderecoEntity> {
    return this.prisma.endereco.findUnique({
      where: {
        id,
        clienteId,
      },
    });
  }

  async update(
    cliente: number,
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
    trx: Prisma.TransactionClient,
  ): Promise<EnderecoEntity> {
    // if (!clienteId) {
    //   throw new Error('Cliente não existe');
    // }

    // delete updateEnderecoDto.clienteId;

    // const cliente = await this.prisma.cliente.findUnique({
    //   where: {
    //     id: clienteId,
    //   },
    // });

    // if (!cliente) {
    //   throw new Error('Cliente não existe');
    // }

    const data: Prisma.EnderecoUpdateInput = {
      ...updateEnderecoDto,
      cliente: {
        connect: {
          id,
        },
      },
    };

    return trx.endereco.update({
      where: {
        clienteId: cliente,
        id,
      },
      data,
    });
  }

  remove(
    clienteId: number,
    id: number,
    trx: Prisma.TransactionClient,
  ): Promise<EnderecoEntity> {
    return trx.endereco.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
