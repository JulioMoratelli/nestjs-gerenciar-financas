import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from '../dto/create-lancamento.dto';
import { UpdateLancamentoDto } from '../dto/update-lancamento.dto';
import { LancamentoEntity } from '../entities/lancamento.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class LancamentosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    cliente: number,
    createLancamentoDto: CreateLancamentoDto,
    trx: Prisma.TransactionClient,
  ): Promise<LancamentoEntity> {
    return trx.lancamento.create({
      data: { clienteId: cliente, ...createLancamentoDto },
    });
  }

  async findAll(clienteId: number): Promise<LancamentoEntity[]> {
    return await this.prisma.lancamento.findMany({
      where: {
        clienteId,
      },
    });
  }

  findOne(clienteId: number, id: number): Promise<LancamentoEntity> {
    return this.prisma.lancamento.findUnique({
      where: {
        clienteId,
        id,
      },
    });
  }

  update(
    clienteId: number,
    id: number,
    updateLancamentoDto: UpdateLancamentoDto,
    trx: Prisma.TransactionClient,
  ) {
    return trx.lancamento.update({
      where: {
        clienteId,
        id,
      },
      data: updateLancamentoDto,
    });
  }

  remove(clienteId: number, id: number, trx: Prisma.TransactionClient) {
    return trx.lancamento.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
