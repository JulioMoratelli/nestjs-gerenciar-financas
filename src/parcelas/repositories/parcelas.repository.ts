import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParcelaDto } from '../dto/create-parcela.dto';
import { ParcelaEntity } from '../entities/parcela.entity';
import { UpdateParcelaDto } from '../dto/update-parcela.dto';

@Injectable()
export class ParcelasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParcelaDto: CreateParcelaDto): Promise<ParcelaEntity> {
    return this.prisma.parcela.create({
      data: createParcelaDto,
    });
  }

  async findAll(): Promise<ParcelaEntity[]> {
    return await this.prisma.parcela.findMany();
  }

  findOne(id: number): Promise<ParcelaEntity> {
    return this.prisma.parcela.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateParcelaDto: UpdateParcelaDto,
  ): Promise<ParcelaEntity> {
    return this.prisma.parcela.update({
      where: {
        id,
      },
      data: updateParcelaDto,
    });
  }

  remove(id: number): Promise<ParcelaEntity> {
    return this.prisma.parcela.delete({
      where: {
        id,
      },
    });
  }
}
