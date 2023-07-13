import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ClientesRepository } from './repositories/clientes.repository';
import { ClientesEntity } from './entities/cliente.entity';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnderecosRepository } from 'src/enderecos/repositories/enderecos.repository';
import { EnderecosService } from 'src/enderecos/enderecos.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Module({
  controllers: [ClientesController],
  providers: [
    ClientesService,
    ClientesRepository,
    PrismaService,

    ContaRepository,

    EnderecosRepository,
    EnderecosService,
  ],
  imports: [CreateClienteDto, ClientesEntity],
})
export class ClientesModule {}
