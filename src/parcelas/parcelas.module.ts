import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelasRepository } from './repositories/parcelas.repository';
import { LancamentoEntity } from 'src/lancamentos/entities/lancamento.entity';

@Module({
  controllers: [ParcelasController],
  providers: [
    ParcelasService,
    PrismaService,
    ParcelasRepository,
    LancamentoEntity,
  ],
  exports: [ParcelasRepository],
})
export class ParcelasModule {}
