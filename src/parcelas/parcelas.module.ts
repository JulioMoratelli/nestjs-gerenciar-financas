import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParcelasRepository } from './repositories/parcelas.repository';

@Module({
  controllers: [ParcelasController],
  providers: [ParcelasService, PrismaService, ParcelasRepository],
})
export class ParcelasModule {}
