import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaRepository } from './repositories/conta.repository';

@Module({
  controllers: [ContasController],
  providers: [ContasService, PrismaService, ContaRepository],
})
export class ContasModule {}
