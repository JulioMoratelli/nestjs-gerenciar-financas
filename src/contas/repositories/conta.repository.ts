import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateContaDto } from '../dto/create-conta.dto';
import { UpdateContaDto } from '../dto/update-conta.dto';
import { ContaEntity } from '../entities/conta.entity';
import { Decimal } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContaRepository {
  saldo: Decimal;
  constructor(private readonly prisma: PrismaService) {}

  // private async pertence(clienteId: number, id: number): Promise<void> {
  //   const verificandoExistencia = await this.prisma.conta.findUnique({
  //     where: {
  //       clienteId,
  //       id,
  //     },
  //   });

  //   if (
  //     !verificandoExistencia ||
  //     verificandoExistencia.clienteId !== clienteId
  //   ) {
  //     throw new Error('A conta não existe ou não pertence ao clienteId');
  //   }
  // }

  async create(
    cliente: number,
    createContaDto: CreateContaDto,
    trx: Prisma.TransactionClient,
  ): Promise<ContaEntity> {
    const { nome } = createContaDto;

    return trx.conta.create({
      data: { clienteId: cliente, nome },
    });
  }

  async findAll(clienteId: number): Promise<ContaEntity[]> {
    return await this.prisma.conta.findMany({
      where: {
        clienteId,
      },
    });
  }

  async findOne(clienteId: number, id: number): Promise<ContaEntity> {
    //await this.pertence(clienteId, id);
    return this.prisma.conta.findUnique({
      where: {
        clienteId,
        id,
      },
    });
  }

  async atualizarSaldoCredito(
    id: number,
    valorParcela: Decimal,
  ): Promise<ContaEntity> {
    return await this.prisma.conta.update({
      where: {
        id,
      },
      data: {
        saldo: {
          increment: valorParcela,
        },
      },
    });
  }

  async atualizarSaldoParcelaPaga(
    id: number,
    valorParcela: Decimal,
  ): Promise<ContaEntity> {
    return await this.prisma.conta.update({
      where: {
        id,
      },
      data: {
        saldo: {
          decrement: valorParcela,
        },
      },
    });
  }

  async update(
    clienteId: number,
    id: number,
    updateContaDto: UpdateContaDto,
    trx: Prisma.TransactionClient,
  ): Promise<ContaEntity> {
    //await this.pertence(clienteId, id);
    return await trx.conta.update({
      where: {
        clienteId,
        id,
      },
      data: updateContaDto,
    });
  }

  async remove(
    clienteId: number,
    id: number,
    trx: Prisma.TransactionClient,
  ): Promise<ContaEntity> {
    //await this.pertence(clienteId, id);
    return trx.conta.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
