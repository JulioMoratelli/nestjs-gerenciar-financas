import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientesRepository } from './repository/clientes.repository';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService, ClientesRepository],
})
export class ClientesModule {}
