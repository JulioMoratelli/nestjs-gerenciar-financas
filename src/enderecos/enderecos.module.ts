import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnderecosRepository } from './repositories/enderecos.repository';
import { ClientesEntity } from 'src/clientes/entities/cliente.entity';

@Module({
  controllers: [EnderecosController],
  providers: [
    EnderecosService,
    PrismaService,
    EnderecosRepository,
    ClientesEntity,
  ],
})
export class EnderecosModule {}
