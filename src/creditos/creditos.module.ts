import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreditosController } from './creditos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreditoRepository } from './repositories/credito.repository';

@Module({
  controllers: [CreditosController],
  providers: [CreditosService, PrismaService, CreditoRepository],
})
export class CreditosModule {}
