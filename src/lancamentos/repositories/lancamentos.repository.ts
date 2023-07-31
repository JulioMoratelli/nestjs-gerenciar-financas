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

  async atualizarStatusLancamento(clienteId: number, id: number) {
    const lancamento = this.prisma.lancamento.findUnique({
      where: {
        clienteId,
        id,
      },
      include: {
        parcela: true,
      },
    });

    const todasParcelas = lancamento.parcela.length;

    const parcelasPasgas = await this.prisma.parcela.count({
      where: {
        lancamentoId: id,
        pago: true,
      },
    });

    if (parcelasPasgas === todasParcelas) {
      return this.prisma.lancamento.update({
        where: {
          clienteId,
          id,
        },
        data: { status: 'PAGO' },
      });
    } else if (parcelasPasgas === 0) {
      return this.prisma.lancamento.update({
        where: {
          clienteId,
          id,
        },
        data: { status: 'DÉBITO' },
      });
    } else {
      return this.prisma.lancamento.update({
        where: {
          clienteId,
          id,
        },
        data: { status: 'PARCIAL' },
      });
    }
  }
}
