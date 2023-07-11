import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ClientesRepository } from './repositories/clientes.repository';
import { ClientesEntity } from './entities/cliente.entity';
import { ContasService } from 'src/contas/contas.service';
import { ContasModule } from 'src/contas/contas.module';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnderecosRepository } from 'src/enderecos/repositories/enderecos.repository';
import { EnderecosService } from 'src/enderecos/enderecos.service';

@Module({
  controllers: [ClientesController],
  providers: [
    ClientesService,
    ClientesRepository,
    PrismaService,
    ClientesEntity,
    ContasService,
    ContaRepository,
    EnderecosRepository,
    EnderecosService,
  ],
  imports: [ContasModule],
})
export class ClientesModule {}
