import { Module } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { LancamentosController } from './lancamentos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LancamentosRepository } from './repositories/lancamentos.repository';
import { ParcelasRepository } from 'src/parcelas/repositories/parcelas.repository';
import { ParcelasService } from 'src/parcelas/parcelas.service';

@Module({
  controllers: [LancamentosController],
  providers: [
    LancamentosService,
    PrismaService,
    LancamentosRepository,
    ParcelasRepository,
    ParcelasService,
  ],
})
export class LancamentosModule {}
