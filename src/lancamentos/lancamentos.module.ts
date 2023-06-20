import { Module } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { LancamentosController } from './lancamentos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LancamentosRepository } from './repositories/lancamentos.repository';

@Module({
  controllers: [LancamentosController],
  providers: [LancamentosService, PrismaService, LancamentosRepository],
})
export class LancamentosModule {}
