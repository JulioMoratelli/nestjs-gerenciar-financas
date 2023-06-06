import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ContasModule } from './contas/contas.module';
import { CreditosModule } from './creditos/creditos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ClientesModule, EnderecosModule, ContasModule, CreditosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
