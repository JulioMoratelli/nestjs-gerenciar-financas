import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from '../dto/create-lancamento.dto';
import { UpdateLancamentoDto } from '../dto/update-lancamento.dto';
import { LancamentoEntity } from '../entities/lancamento.entity';

@Injectable()
export class LancamentosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createLancamentoDto: CreateLancamentoDto,
  ): Promise<LancamentoEntity> {
    return this.prisma.lancamento.create({
      data: createLancamentoDto,
    });
  }

  async findAll(clienteId: number): Promise<LancamentoEntity[]> {
    return await this.prisma.lancamento.findMany({
      where: {
        clienteId,
      },
    });
  }

  findOne(clienteId: number, id: number) {
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
  ) {
    return this.prisma.lancamento.update({
      where: {
        clienteId,
        id,
      },
      data: updateLancamentoDto,
    });
  }

  remove(clienteId: number, id: number) {
    return this.prisma.lancamento.delete({
      where: {
        clienteId,
        id,
      },
    });
  }
}
