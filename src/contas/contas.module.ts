import { ClientesRepository } from './../clientes/repositories/clientes.repository';
import { CreditoRepository } from './../creditos/repositories/credito.repository';
import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaRepository } from './repositories/conta.repository';
import { ParcelasService } from 'src/parcelas/parcelas.service';
import { CreditosService } from 'src/creditos/creditos.service';
import { ParcelasRepository } from 'src/parcelas/repository/parcelas.repository';

@Module({
  controllers: [ContasController],
  providers: [
    ContasService,
    PrismaService,
    ContaRepository,
    CreditoRepository,
    ClientesRepository,
    ParcelasRepository,
    CreditoRepository,
  ],
  exports: [ContasService, ContasModule],
})
export class ContasModule {}
