import { Module } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { LancamentosController } from './lancamentos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LancamentosRepository } from './repositories/lancamentos.repository';
import { ParcelasRepository } from 'src/parcelas/parcelas.repository';
import { ParcelasService } from 'src/parcelas/parcelas.service';
import { ContaEntity } from 'src/contas/entities/conta.entity';
import { ContaRepository } from 'src/contas/repositories/conta.repository';

@Module({
  controllers: [LancamentosController],
  providers: [
    LancamentosService,
    PrismaService,
    LancamentosRepository,
    ParcelasRepository,
    ParcelasService,
    ContaEntity,
    ContaRepository,
  ],
})
export class LancamentosModule {}
