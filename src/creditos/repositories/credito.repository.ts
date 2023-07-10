import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCreditoDto } from '../dto/create-credito.dto';
import { UpdateCreditoDto } from '../dto/update-credito.dto';
import { CreditoEntity } from '../entities/credito.entity';

@Injectable()
export class CreditoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async pertence(clienteId: number, id: number): Promise<void> {
    const verificandoExistencia = await this.prisma.credito.findFirst({
      where: {
        clienteId,
        id,
      },
    });

    if (
      !verificandoExistencia ||
      verificandoExistencia.clienteId !== clienteId
    ) {
      throw new Error('O crédito não existe ou não pertence ao clienteId');
    }
  }

  async create(createCreditoDto: CreateCreditoDto): Promise<CreditoEntity> {
    return this.prisma.credito.create({
      data: createCreditoDto,
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
  ): Promise<CreditoEntity> {
    return this.prisma.credito.update({
      where: {
        clienteId,
        id,
      },
      data: updateCreditoDto,
    });
  }

  remove(id: number, clienteId: number): Promise<CreditoEntity> {
    return this.prisma.credito.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
