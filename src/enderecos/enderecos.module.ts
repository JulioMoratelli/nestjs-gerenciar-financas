import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnderecosRepository } from './repositories/enderecos.repository';

@Module({
  controllers: [EnderecosController],
  providers: [EnderecosService, PrismaService, EnderecosRepository],
})
export class EnderecosModule {}
