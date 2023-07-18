import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCreditoDto } from '../dto/create-credito.dto';
import { UpdateCreditoDto } from '../dto/update-credito.dto';
import { CreditoEntity } from '../entities/credito.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreditoRepository {
  constructor(private readonly prisma: PrismaService) {}

  // private async pertence(clienteId: number, id: number): Promise<void> {
  //   const verificandoExistencia = await this.prisma.credito.findFirst({
  //     where: {
  //       clienteId,
  //       id,
  //     },
  //   });

  //   if (
  //     !verificandoExistencia ||
  //     verificandoExistencia.clienteId !== clienteId
  //   ) {
  //     throw new Error('O crédito não existe ou não pertence ao clienteId');
  //   }
  // }

  async create(
    cliente,
    createCreditoDto: CreateCreditoDto,
    trx: Prisma.TransactionClient,
  ): Promise<CreditoEntity> {
    const { contaId, valor } = createCreditoDto;

    return trx.credito.create({
      data: { clienteId: cliente, contaId, valor },
    });
  }

  async findAll(clienteId: number): Promise<CreditoEntity[]> {
    return this.prisma.credito.findMany({
      where: {
        clienteId,
      },
    });
  }

  findOne(id: number, clienteId: number): Promise<CreditoEntity> {
    return this.prisma.credito.findUnique({
      where: {
        clienteId,
        id,
      },
    });
  }

  update(
    id: number,
    clienteId: number,
    updateCreditoDto: UpdateCreditoDto,
    trx: Prisma.TransactionClient,
  ): Promise<CreditoEntity> {
    return trx.credito.update({
      where: {
        clienteId,
        id,
      },
      data: updateCreditoDto,
    });
  }

  remove(
    id: number,
    clienteId: number,
    trx: Prisma.TransactionClient,
  ): Promise<CreditoEntity> {
    return trx.credito.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
