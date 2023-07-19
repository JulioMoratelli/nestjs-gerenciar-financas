import { ClientesRepository } from './../clientes/repositories/clientes.repository';
import { ContaRepository } from './../contas/repositories/conta.repository';
import { ContaEntity } from './../contas/entities/conta.entity';
import { ParcelasService } from 'src/parcelas/parcelas.service';
import { ParcelasRepository } from './../parcelas/repository/parcelas.repository';
import { Module } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { LancamentosController } from './lancamentos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LancamentosRepository } from './repositories/lancamentos.repository';

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
    ClientesRepository,
  ],
})
export class LancamentosModule {}
