import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientesRepository } from './repositories/clientes.repository';
import { ClientesEntity } from './entities/cliente.entity';
import { ContasService } from 'src/contas/contas.service';
import { ContasModule } from 'src/contas/contas.module';
import { ContaRepository } from 'src/contas/repositories/conta.repository';

@Module({
  controllers: [ClientesController],
  providers: [
    ClientesService,
    PrismaService,
    ClientesRepository,
    ClientesEntity,
    ContasService,
    ContaRepository,
  ],
  imports: [ContasModule],
})
export class ClientesModule {}
