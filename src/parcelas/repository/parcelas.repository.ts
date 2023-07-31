import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcelaDto } from '../dto/create-parcela.dto';
import { ParcelaEntity } from '../entities/parcela.entity';
import { Prisma } from '@prisma/client';
import { UpdateParcelaRepositoryDto } from '../dto/update-parcela-repository-dto';

@Injectable()
export class ParcelasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    cliente: number,
    createParcelaDto: CreateParcelaDto,
    trx: Prisma.TransactionClient,
  ): Promise<ParcelaEntity> {
    return trx.parcela.create({
      data: { clienteId: cliente, ...createParcelaDto },
    });
  }

  async findAll(
    clienteId: number,
    periodo?: { deData: Date; ateData: Date },
    status?: boolean,
  ): Promise<ParcelaEntity[]> {
    return await this.prisma.parcela.findMany({
      where: {
        clienteId,
        ...(status !== undefined && { pago: status }),
        ...(periodo !== undefined && {
          vencimento: { gte: periodo.deData, lte: periodo.ateData },
        }),
      },
    });
  }

  findOne(clienteId: number, id: number): Promise<ParcelaEntity> {
    return this.prisma.parcela.findUnique({
      where: {
        clienteId,
        id,
      },
    });
  }

  update(
    clienteId: number,
    id: number,
    updateParcelaRepositoryDto: UpdateParcelaRepositoryDto,
    trx: Prisma.TransactionClient,
  ): Promise<ParcelaEntity> {
    return trx.parcela.update({
      where: {
        clienteId,
        id,
      },
      data: updateParcelaRepositoryDto,
    });
  }

  // remove(
  //   clienteId: number,
  //   lancamentoId: number,
  //   id: number,
  // ): Promise<ParcelaEntity> {
  //   return this.prisma.parcela.delete({
  //     where: {
  //       clienteId,
  //       lancamentoId,
  //       id,
  //     },
  //   });
  // }

  removeParcelaComLancamento(
    lancamentoId: number,
    trx: Prisma.TransactionClient,
  ) {
    return trx.parcela.deleteMany({
      where: {
        lancamentoId,
      },
    });
  }

  // atualizarStatusPagamento(clienteId: number, id: number, status: boolean) {
  //   return this.prisma.parcela.update({
  //     where: {
  //       clienteId,
  //       id,
  //     },
  //     data: { pago: status },
  //   });
  // }

  // findAllLancamento(lancamentoId: number) {
  //   return this.prisma.parcela.findMany({
  //     where: {
  //       lancamentoId,
  //     },
  //   });
  // }

  findAllParcelasPagas(lancamentoId: number) {
    return this.prisma.parcela.findMany({
      where: {
        lancamentoId,
        pago: true,
      },
    });
  }
}
