import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { ContaEntity } from 'src/contas/entities/conta.entity';
import { ContaRepository } from 'src/contas/repositories/conta.repository';

@Module({
  controllers: [ParcelasController],
  providers: [
    ParcelasService,
    PrismaService,
    ParcelasRepository,
    ContaEntity,
    ContaRepository,
  ],
  exports: [ParcelasRepository],
})
export class ParcelasModule {}
