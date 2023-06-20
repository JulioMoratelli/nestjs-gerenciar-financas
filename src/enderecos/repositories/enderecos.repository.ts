import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { EnderecoEntity } from '../entities/endereco.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnderecosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<EnderecoEntity> {
    const { clienteId } = createEnderecoDto;

    // const data: Prisma.EnderecoCreateInput = {};

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
      include: {
        enderecos: true,
      },
    });

    if (!cliente) {
      throw new Error('Cliente não existe');
    }

    return this.prisma.endereco.create({
      data: createEnderecoDto,
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
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<EnderecoEntity> {
    const { clienteId } = updateEnderecoDto;

    if (!clienteId) {
      throw new Error('Cliente não existe');
    }

    delete updateEnderecoDto.clienteId;

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });

    if (!cliente) {
      throw new Error('Cliente não existe');
    }

    const data: Prisma.EnderecoUpdateInput = {
      ...updateEnderecoDto,
      cliente: {
        connect: {
          id: clienteId,
        },
      },
    };

    return this.prisma.endereco.update({
      where: {
        clienteId,
        id,
      },
      data,
    });
  }

  remove(clienteId: number, id: number): Promise<EnderecoEntity> {
    return this.prisma.endereco.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
