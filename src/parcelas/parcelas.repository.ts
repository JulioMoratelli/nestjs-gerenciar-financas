import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { ParcelaEntity } from './entities/parcela.entity';
import { UpdateParcelaDto } from './dto/update-parcela.dto';

@Injectable()
export class ParcelasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParcelaDto: CreateParcelaDto): Promise<ParcelaEntity> {
    return this.prisma.parcela.create({
      data: createParcelaDto,
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
    lancamentoId: number,
    id: number,
    updateParcelaDto: UpdateParcelaDto,
  ): Promise<ParcelaEntity> {
    return this.prisma.parcela.update({
      where: {
        clienteId,
        lancamentoId,
        id,
      },
      data: updateParcelaDto,
    });
  }

  remove(
    clienteId: number,
    lancamentoId: number,
    id: number,
  ): Promise<ParcelaEntity> {
    return this.prisma.parcela.delete({
      where: {
        clienteId,
        lancamentoId,
        id,
      },
    });
  }
}
