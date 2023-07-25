import { ClientesRepository } from './../clientes/repositories/clientes.repository';
import { ContaRepository } from './../contas/repositories/conta.repository';
import { ContaEntity } from './../contas/entities/conta.entity';
import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelasRepository } from './repository/parcelas.repository';
import { LancamentosRepository } from 'src/lancamentos/repositories/lancamentos.repository';

@Module({
  controllers: [ParcelasController],
  providers: [
    ParcelasService,
    PrismaService,
    ParcelasRepository,
    ContaEntity,
    ContaRepository,
    ClientesRepository,
    LancamentosRepository,
  ],
  imports: [],
  exports: [ParcelasRepository],
})
export class ParcelasModule {}
