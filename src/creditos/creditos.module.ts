import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreditosController } from './creditos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreditoRepository } from './repositories/credito.repository';
import { ContaRepository } from 'src/contas/repositories/conta.repository';
import { ClientesService } from 'src/clientes/clientes.service';
import { ClientesRepository } from 'src/clientes/repositories/clientes.repository';
import { EnderecosRepository } from 'src/enderecos/repositories/enderecos.repository';

@Module({
  controllers: [CreditosController],
  providers: [
    CreditosService,
    PrismaService,
    CreditoRepository,
    ContaRepository,
    ClientesService,
    ClientesRepository,
    EnderecosRepository,
  ],
  exports: [CreditoRepository],
})
export class CreditosModule {}
