import { ClientesRepository } from './../clientes/repositories/clientes.repository';
import { CreditoRepository } from './../creditos/repositories/credito.repository';
import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaRepository } from './repositories/conta.repository';

@Module({
  controllers: [ContasController],
  providers: [
    ContasService,
    PrismaService,
    ContaRepository,
    CreditoRepository,
    ClientesRepository,
  ],
  exports: [ContasService, ContasModule],
})
export class ContasModule {}
