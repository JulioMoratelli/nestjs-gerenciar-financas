import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreditosController } from './creditos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreditoRepository } from './repositories/credito.repository';
import { ContaRepository } from 'src/contas/repositories/conta.repository';

@Module({
  controllers: [CreditosController],
  providers: [
    CreditosService,
    PrismaService,
    CreditoRepository,
    ContaRepository,
  ],
  exports: [CreditoRepository],
})
export class CreditosModule {}
